import React, { useEffect } from 'react';
import ModalComponent from './Modal';
import useForm from '../Form/useForm';
import FormInput from '../Form/Form.Input';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Field from '../Form/Field';
import api from '../../api';

interface IProps extends React.Props<{}> {
  isOpen: boolean;
  onClose: () => void;
}

const USERNAME = 'username';
const PASSWORD = 'password';
const EMAIL = 'email';
const PHONE = 'phone';
const formSchema: any = {
  [USERNAME]: {
    type: 'text',
    constraints: [['isRequired', 'Username cannot be empty!']]
  },
  [PASSWORD]: {
    type: 'password',
    constraints: [['isRequired', 'Password cannot be empty!']]
  },
  [EMAIL]: {
    type: 'text',
    constraints: [['isRequired', 'Email cannot be empty!'], ['isEmail', 'Email format is invalid.']]
  },
  [PHONE]: {
    type: 'text',
    constraints: [['isRequired', 'Phone number cannot be empty!'], ['isNumber', 'Phone number format is invalid.']]
  }
};

const RegisterModal: React.SFC<IProps> = (props: IProps) => {
  const form = useForm();
  useEffect(() => {
    form.setupFormFields(formSchema);
  }, []);
  const onSubmit = async () => {
    if (await form.validateAllFields()) {
      const data = form.getFormData();
      try {
        const response = await api.registerUser(data);
        throw true;
        props.onClose();
      } catch (error) {
        console.log('err', error);
      }
    }
  };
  return (
    <ModalComponent title='Register an Account' isOpen={props.isOpen} onClose={props.onClose}>
      <Form size='small'>
        <Segment stacked textAlign='center'>
          <FormInput field={USERNAME} form={form} placeholder='Username' icon='user' />
          <br />
          <FormInput field={PASSWORD} form={form} placeholder='Password' icon='lock' />
          <br />
          <FormInput field={EMAIL} form={form} placeholder='email' icon='mail' />
          <br />
          <FormInput field={PHONE} form={form} placeholder='contact number' icon='phone' />
          <br />
          <Button color='teal' fluid size='large' onClick={onSubmit}>
            Register
          </Button>
        </Segment>
      </Form>
    </ModalComponent>
  );
};

export default RegisterModal;
