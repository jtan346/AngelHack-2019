import React from 'react';
import ModalComponent from './Modal';
import { Form, Segment, Dropdown, Button } from 'semantic-ui-react'
import './FilterModal.scss';

interface IProps extends React.Props<{}> {
  isOpen: boolean;
  onClose: () => void;
}

const options = [
  { key: '0', text: 'All', value: 'All' },
  { key: '1', text: 'My', value: 'My' }
]

const onSubmit = () => {

}

const FilterModal: React.SFC<IProps> = (props: IProps) => {
  return (
    <ModalComponent title='Filter' isOpen={props.isOpen} onClose={props.onClose}>
      <Form size='small'>
        <Segment stacked textAlign='center'>
          <div>
            Showing <Dropdown downward floating inline options={options} defaultValue='All' /> Posts
          </div>
          <br/>
          <Button color='teal' size='small' onClick={onSubmit}>
            Apply
          </Button>
        </Segment>
      </Form>
    </ModalComponent>
  );
};

export default FilterModal;
