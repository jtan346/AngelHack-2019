import React, { useState } from 'react';
import { Icon, Dropdown, Button, Menu } from 'semantic-ui-react'
import './Notifications.scss';

const Notifications: React.SFC<{}> = () => {
  let push = [];

  push = [
    {
      key: '1',
      text: 'Seng Cheong has been found!',
      value: 'Seng Cheong has been found!',
      image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/elliot.jpg' }
    },
    {
      key: '2',
      text: 'Benji has been found!',
      value: 'Benji has been found!',
      image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg' }
    }
  ];

  return (
    <Menu.Item>
      <Dropdown
        icon='bell outline'
        floating
        enabled
        className='icon'
      >
        <Dropdown.Menu>
          <Dropdown.Header content='Click on user to verify' />
          {push.map(option => (
            <Dropdown.Item key = {option.value} {...option} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {push.length>0 && <span className="notificationCount">{push.length}</span>}
    </Menu.Item>
  )
}

export default Notifications
