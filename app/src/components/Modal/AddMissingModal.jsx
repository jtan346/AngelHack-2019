import React, { useEffect, useState } from 'react';
import ModalComponent from './Modal';
import { Storage } from 'aws-amplify';

import useForm from '../Form/useForm';
import { Button, Segment } from 'semantic-ui-react';
import FormInput from '../Form/Form.Input';
import { PhotoPicker } from 'aws-amplify-react';
import './AddMissingModal.scss';
// interface IProps extends React.Props<{}> {
//   isOpen: boolean;
//   onClose: () => void;
// }

const NAME = 'name';
const AGE = 'age';
const LASTKNOWN = 'lastKnown';
const formSchema = {
  [NAME]: {
    type: 'text',
    constraints: [['isRequired', 'Username cannot be empty!']]
  },
  [AGE]: {
    type: 'text',
    constraints: [['isRequired', 'Age cannot be empty!']]
  },
  [LASTKNOWN]: {
    type: 'text',
    constraints: [['isRequired', 'Last known cannot be empty!']]
  }
};
const AddMissingModal = props => {
  const form = useForm();
  useEffect(() => {
    form.setupFormFields(formSchema);
  }, []);

  const [upload, setUpload] = useState();

  const onSubmit = async () => {
    // if (await form.validateAllFields()) {
    const data = form.getFormData();
    console.log(upload);
    try {
      //send to server

      //on success upload files
      const filepath = 'username/missingpersonid/image2.png';
      // const file = await Storage.put(filepath, upload.file, {
      //   contentType: 'image/png'
      // });
      // console.log(file);
    } catch (error) {
      console.log(error);
    }
    props.onClose();
    // }
  };

  return (
    <ModalComponent title='Add Missing Person' isOpen={props.isOpen} onClose={props.onClose}>
      <Segment stacked textAlign='center'>
        <PhotoPicker preview onPick={data => setUpload(data)} />
        <br />
        <FormInput field={NAME} form={form} placeholder='Name' />
        <br />
        <FormInput field={AGE} form={form} placeholder='Age' />
        <br />
        <FormInput field={LASTKNOWN} form={form} placeholder='Last Known Location' />
        <br />
        <Button color='teal' fluid size='large' onClick={onSubmit}>
          Submit Missing Person
        </Button>
      </Segment>
    </ModalComponent>
  );
};

export default AddMissingModal;
