import React, { useEffect, useState } from 'react';
import ModalComponent from './Modal';
import { Form, Segment, Dropdown, Button } from 'semantic-ui-react'
import './FilterModal.scss';
import useForm from '../Form/useForm';
import FormInput from '../Form/Form.Input';

interface IProps extends React.Props<{}> {
  isOpen: boolean;
  onClose: () => void;
}

const options = [
  { key: '0', text: 'All', value: 'All' },
  { key: '1', text: 'My', value: 'My' }
]

const COUNTRY = 'country';
const formSchema: any = {
  [COUNTRY]: {
    type: 'text',
    constraints: [['isRequired', 'Country cannot be empty!']]
  }
}



const FilterModal: React.SFC<IProps> = (props: IProps) => {
  const form = useForm();
  useEffect(() => {
    form.setupFormFields(formSchema);
  }, []);

  const onSubmit = () => {
    props.onClose();
  }

  return (
    <ModalComponent title='Filter' isOpen={props.isOpen} onClose={props.onClose}>
      <Form size='small'>
        <Segment stacked textAlign='center'>
          <div>
            Showing <Dropdown downward floating inline options={options} defaultValue='All' /> Posts
          </div>
          <br />
          <FormInput field={COUNTRY} form={form} placeholder='Last Known Position' />
          <br />
          <Button color='teal' fliud size='large' onClick={onSubmit}>
            Apply
          </Button>
        </Segment>
      </Form>
    </ModalComponent>
  );
};

export default FilterModal;
