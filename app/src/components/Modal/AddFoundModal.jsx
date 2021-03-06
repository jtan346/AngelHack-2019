import React, { useEffect, useState } from 'react';
import ModalComponent from './Modal';
import { Storage } from 'aws-amplify';
import VerificationModal from './VerificationModal';
import useForm from '../Form/useForm';
import { Button, Segment } from 'semantic-ui-react';
import FormInput from '../Form/Form.Input';
import { PhotoPicker } from 'aws-amplify-react';
import './AddFoundModal.scss';
import api from '../../api';

const LOCATION = 'location';
const DESC = 'desc';
const formSchema = {
  [LOCATION]: {
    type: 'text'
  },
  [DESC]: {
    type: 'text'
  }
};
const AddFoundModal = props => {
  const form = useForm();
  useEffect(() => {
    form.setupFormFields(formSchema);
  }, []);

  const [upload, setUpload] = useState();

  const [activeNotification, setActiveNotification] = useState();

  const [openVerification, setOpenVerification] = useState(false);
  const openVerificationHandler = notification => {
    setActiveNotification(notification);
    setOpenVerification(true);
  };
  const closeVerificationHandler = () => {
    setOpenVerification(false);
  };

  const onSubmit = async () => {
    // if (await form.validateAllFields()) {
    const data = form.getFormData();
    try {
      //on success upload files
      const filepath = `found/${upload.name}`;
      const file = await Storage.put(filepath, upload.file, {
        level: 'public',
        contentType: 'image/png'
      });

      //send to server
      // const token = document.cookie.replace('token=','')
      let response;
      try {
        response = await api.addFoundPerson({
          image: `public/${filepath}`,
          description: form.getField(DESC).value,
          location: form.getField(LOCATION).value
        });
        console.log(response);
      } catch (err) {}

      response = {
        match: 'true',
        missingPersonImage:
          `https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/${response.missingPersonImage}`,
        foundPersonImage:
          `https://angelhackimages-dev.s3-ap-southeast-1.amazonaws.com/${response.foundPersonImage}`
      };

      //if successful open handler
      if (response.match === 'true') {
        let notification = {
          missingPersonImage: response.missingPersonImage,
          foundPersonImage: response.foundPersonImage
        };
        openVerificationHandler(notification);
      } else {
        openVerificationHandler(undefined);
      }

      props.onClose();
    } catch (error) {
      console.log(error);
    }
    props.onClose();
  };

  return (
    <>
      <ModalComponent title='Add Found Person' isOpen={props.isOpen} onClose={props.onClose}>
        <Segment stacked textAlign='left'>
          <PhotoPicker preview onPick={data => setUpload(data)} />
          <br />
          <FormInput field={LOCATION} form={form} placeholder='Location' />
          <br />
          <FormInput field={DESC} form={form} placeholder='Description' />
          <br />
          <Button color='teal' fluid size='large' onClick={onSubmit}>
            Submit Found Person
          </Button>
        </Segment>
      </ModalComponent>
      <VerificationModal
        isOpen={openVerification}
        onClose={closeVerificationHandler}
        missingPersonImage={activeNotification ? activeNotification.missingPersonImage : undefined}
        foundPersonImage={activeNotification ? activeNotification.foundPersonImage : undefined}
      />
    </>
  );
};

export default AddFoundModal;
