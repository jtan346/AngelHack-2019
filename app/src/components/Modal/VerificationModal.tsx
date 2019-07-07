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
      {props.missingPersonImage !== undefined && (
        <>
          <Modal.Header>MATCH</Modal.Header>
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
            <div className='verification-desc'>
              <p>The emergency has been notified and will contact you.</p>
            </div>
          </Modal.Content>
        </>
      )}
      {props.missingPersonImage === undefined && (
        <>
          <Modal.Header>No Match Found</Modal.Header>
          <Modal.Content>
            <div className='verification-desc'>
              <p>Sorry, the individual is not in our database</p>
            </div>
          </Modal.Content>
        </>
      )}
    </Modal>
  );
};

export default VerificationModal;
