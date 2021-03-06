import React, { useState } from 'react';
import { Icon, Dropdown, Button, Menu } from 'semantic-ui-react';
import './Notifications.scss';
import VerificationModal from '../Modal/VerificationModal';

export interface INotification {
  missingPersonImage: string;
  foundPersonImage: string;
}
const Notifications: React.SFC<{}> = () => {
  let notifications: INotification[] = [
    {
      missingPersonImage: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg',
      foundPersonImage: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'
    }
  ];

  let push = notifications.map((notif: INotification, index: number) => ({
    key: index,
    text: `Potential match for`,
    value: `Potential match for `,
    image: { avatar: true, src: notif.foundPersonImage }
  }));
  // let push = [
  //   {
  //     key: '1',
  //     text: 'Seng Cheong has been found!',
  //     value: 'Seng Cheong has been found!',
  //     image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg' },
  //   },
  //   {
  //     key: '2',
  //     text: 'Benji has been found!',
  //     value: 'Benji has been found!',
  //     image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg' }
  //   }
  // ];
  const [activeNotification, setActiveNotification] = useState(notifications[0]);

  const [openVerification, setOpenVerification] = useState(false);
  const openVerificationHandler = (index: number) => {
    setActiveNotification(notifications[index]);
    setOpenVerification(true);
  };
  const closeVerificationHandler = () => {
    setOpenVerification(false);
  };

  return (
    <>
      <Menu.Item>
        <Dropdown icon='bell outline' floating enabled className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header content='Click on user to verify' />
            {push.map(option => (
              <Dropdown.Item key={option.value} {...option} onClick={() => openVerificationHandler(option.key)} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {push.length > 0 && <span className='notificationCount'>{push.length}</span>}
      </Menu.Item>
      {/* <VerificationModal
        isOpen={openVerification}
        onClose={closeVerificationHandler}
        missingPersonImage={activeNotification.missingPersonImage}
        foundPersonImage={activeNotification.foundPersonImage}
        foundPersonDescription={activeNotification.foundPersonDescription}
        finderName={activeNotification.finderName}
        finderContact={activeNotification.finderContact}
      /> */}
    </>
  );
};

export default Notifications;
