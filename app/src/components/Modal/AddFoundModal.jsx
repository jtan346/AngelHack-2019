import React, { useEffect, useState } from 'react';
import ModalComponent from './Modal';
import { Storage } from 'aws-amplify';

import useForm from '../Form/useForm';
import { Button, Segment } from 'semantic-ui-react';
import FormInput from '../Form/Form.Input';
import { PhotoPicker } from 'aws-amplify-react';
import './AddFoundModal.scss';

const NAME = 'name';
const AGE = 'age';
const LOCATION = 'location';
const formSchema = {
  [NAME]: {
    type: 'text',
    constraints: [['isRequired', 'Username cannot be empty!']]
  },
  [AGE]: {
    type: 'text',
    constraints: [['isRequired', 'Age cannot be empty!']]
  },
  [LOCATION]: {
    type: 'text',
    constraints: [['isRequired', 'Location cannot be empty!']]
  }
}

const AddFoundModal = props => {
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
      // send to server

      // on success upload files
      const filepath = 'username/foundpersonid/image2.png';
      const file = await Storage.put(filepath, upload.file, {
        contentType: 'image/png'
      });
      console.log(file);
    } catch (error) {
        console.log(error);
    }
    props.onClose();
  };

  return (
    <ModalComponent title='Add Found Person' isOpen={props.isOpen} onClose={props.onClose}>
      <Segment stacked textAlign='left'>
        <PhotoPicker preview onPick={data => setUpload(data)} />
        <br />
        <label for="desc">Description <span class="desc-span">(Optional)</span></label>
        <textarea name="message"></textarea>
        <br />
        <Button color='teal' fluid size='large' onClick={onSubmit}>
          Submit Found Person
        </Button>
      </Segment>
    </ModalComponent>
  );
};

export default AddFoundModal;
