import React, { useState } from 'react';
import ModalComponent from './Modal';
import { Button, Segment, Modal, Image } from 'semantic-ui-react';
import './VerificationModal.scss';
import api from '../../api';

interface IProps extends React.Props<{}> {
  isOpen: boolean;
  onClose: () => void;
  missingPersonImage?: string;
  foundPersonImage?: string;
  foundPersonDescription?: string;
  finderName?: string;
  finderContact?: string;
}

const VerificationModal: React.SFC<IProps> = (props: IProps) => {
  const [accepted, setAccepted] = useState(false);

  const onAccept = async () => {
    //send accept

    setAccepted(true);
  };
  const onClose = async () => {
    props.onClose();
  };
  return (
    <Modal size='large' open={props.isOpen} onClose={props.onClose} closeOnDimmerClick={true} closeOnEscape={true}>
      <Modal.Header>Verify potential match</Modal.Header>
      <Modal.Content>
        <div className='verification-imagebox'>
          <div className='verification-image-container'>
            <Image className='verification-image' src={props.foundPersonImage} size='medium' circular />
          </div>
          <div className='verification-image-container'>
            <Image className='verification-image' src={props.missingPersonImage} size='medium' circular />
          </div>
        </div>
        <br />
        {accepted && (
          <div className='verification-desc'>
            <p>Contact Info: {props.finderContact}</p>
            <p>Name: {props.finderName}</p>
          </div>
        )}
        {!accepted && (
          <>
            <div className='verification-desc'>{props.foundPersonDescription}</div>
            <br />
            <Button.Group fluid>
              <Button positive color='teal' size='huge' onClick={onAccept}>
                Accept
              </Button>
              <Button negative color='teal' size='huge' onClick={onClose}>
                Reject
              </Button>
            </Button.Group>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default VerificationModal;
