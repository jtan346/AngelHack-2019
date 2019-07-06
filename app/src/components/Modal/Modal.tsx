import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import './Modal.scss';

interface IProps extends React.Props<{}> {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.SFC<IProps> = (props: IProps) => {
  const showTitle = props.title !== undefined;
  return (
    <Modal open={props.isOpen} onClose={props.onClose} closeOnDimmerClick={true} closeOnEscape={true}>
      {showTitle && <Modal.Header>{props.title}</Modal.Header>}

      <Modal.Content>
        <Modal.Description>{props.children}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ModalComponent;
