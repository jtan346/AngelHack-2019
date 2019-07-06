import React, { useState } from 'react';
import { Menu, Input, Icon, Dropdown, Button } from 'semantic-ui-react';
import LoginModal from '../Modal/RegisterModal';
import Notifications from '../../components/Notifications';
import './Header.scss';

interface IProps extends React.Props<{}> {
  register: () => void;
  login: () => void;
  missing: () => void;
  user?: string;
}

const HeaderComponent: React.SFC<IProps> = (props: IProps) => {
  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{props.user}</strong>
        </span>
      ),
      disabled: true
    },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' }
  ];

  const isLoggedIn = document.cookie.includes('token') ? true : true;

  return (
    <header>
      {isLoggedIn ? (
        <Menu>
          <Menu.Item className='title' name='Find My Buddy' />
          <Notifications />
          <Menu.Menu position='right'>
            <Menu.Item name='Add Missing Person' onClick={props.missing} />
            <Menu.Item>
              <Input icon='search' transparent placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
              <Dropdown
                trigger={
                  <span>
                    <Icon name='user outline' />
                  </span>
                }
                options={options}
                pointing='top right'
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu>
          <Menu.Item className='title' name='Find My Buddy' />
          <Menu.Menu position='right'>
            <Menu.Item name='login' onClick={props.login} />
            <Menu.Item name='register' onClick={props.register} />
          </Menu.Menu>
        </Menu>
      )}
    </header>
  );
};

export default HeaderComponent;
