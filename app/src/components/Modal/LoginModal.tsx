import React, { useEffect } from 'react';
import ModalComponent from './Modal';
import useForm from '../Form/useForm';
import FormInput from '../Form/Form.Input';
import { Button, Form, Segment } from 'semantic-ui-react';
import './LoginModal.scss';
import api from '../../api';

interface IProps extends React.Props<{}> {
  isOpen: boolean;
  onClose: () => void;
}

const USERNAME = 'username';
const PASSWORD = 'password';
const formSchema: any = {
  [USERNAME]: {
    type: 'text',
    constraints: [['isRequired', 'Username cannot be empty!']]
  },

  [PASSWORD]: {
    type: 'password',
    constraints: [['isRequired', 'Password cannot be empty!']]
  }
};

const LoginModal: React.SFC<IProps> = (props: IProps) => {
  const form = useForm();
  useEffect(() => {
    form.setupFormFields(formSchema);
  }, []);
  const onSubmit = async () => {
    // if (await form.validateAllFields()) {
    const data = {
      username: form.getField(USERNAME).value,
      password: form.getField(PASSWORD).value
    };

    try {
      const response = await api.login(data);
      document.cookie = 'token=republicofpankaj1994;';
      props.onClose();
    } catch (error) {
      console.log('err', error);
    }
    // }
  };
  return (
    <ModalComponent title='Login' isOpen={props.isOpen} onClose={props.onClose}>
      <Form size='small'>
        <Segment stacked textAlign='center'>
          <FormInput field={USERNAME} form={form} placeholder='Username' icon='user' />
          <br />
          <FormInput field={PASSWORD} form={form} placeholder='Password' icon='lock' />
          <br />
          <Button color='teal' fluid size='large' onClick={onSubmit}>
            Login
          </Button>
        </Segment>
      </Form>
    </ModalComponent>
  );
};

export default LoginModal;
