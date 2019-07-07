import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu, Input, Icon, Dropdown, Button, Sidebar, Responsive, Segment } from 'semantic-ui-react';
import './App.scss';
import Homepage from './pages/Homepage';
import LoginModal from './components/Modal/LoginModal';
import AddMissingModal from './components/Modal/AddMissingModal';
import Header from './components/Header';
import Notifications from './components/Notifications';
import RegisterModal from './components/Modal/RegisterModal';
import AddFoundModal from './components/Modal/AddFoundModal';
Amplify.configure(awsconfig);

interface MobileProps extends React.Props<{}> {
  missing: () => void;
  found: () => void;
  visible: boolean;
  hide: () => void;
}

const MobileSidebar: React.SFC<MobileProps> = (props: MobileProps) => {
  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' onHide={props.hide} vertical visible={props.visible}>
      <Menu.Item>FindMyBuddy</Menu.Item>

      <Menu.Item onClick={props.missing}>Update Profile</Menu.Item>

      <Menu.Item onClick={props.found}>Add Found Person</Menu.Item>
    </Sidebar>
  );
};

const App: React.FC = () => {
  let user = 'John';

  const [visible, setVisible] = useState(false);
  const openSidebarHandler = () => {
    setVisible(true);
  };
  const hideSidebarHandler = () => {
    setVisible(false);
  };

  const [openRegister, setOpenRegister] = useState(false);
  const openRegisterHandler = () => {
    setOpenRegister(true);
  };
  const closeRegisterHandler = () => {
    setOpenRegister(false);
  };

  const [openLogin, setOpenLogin] = useState(false);
  const openLoginHandler = () => {
    setOpenLogin(true);
  };
  const closeLoginHandler = () => {
    setOpenLogin(false);
  };

  const [openMissing, setOpenMissing] = useState(false);
  const openMissingHandler = () => {
    setOpenMissing(true);
  };
  const closeMissingHandler = () => {
    setOpenMissing(false);
  };

  const [openFound, setOpenFound] = useState(false);
  const openFoundHandler = () => {
    setOpenFound(true);
  };
  const closeFoundHandler = () => {
    setOpenFound(false);
  };

  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{user}</strong>
        </span>
      ),
      disabled: true
    },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out' }
  ];

  return (
    <div className='App'>
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable as={Segment}>
          <MobileSidebar
            found={openFoundHandler}
            missing={openMissingHandler}
            visible={visible}
            hide={hideSidebarHandler}
          />
          <Sidebar.Pusher dimmed={visible} style={{ minHeight: '100vh' }}>
            <Segment basic>
              <Menu fixed='top'>
                <Menu.Item onClick={openSidebarHandler}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Notifications />
                <Menu.Menu position='right'>
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
            </Segment>
            <Router>
              <Switch>
                <Route path='/' exact render={() => <Homepage />} />
                <Route render={() => <h1>Hello There</h1>} />
              </Switch>
            </Router>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>

      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Header
          found={openFoundHandler}
          missing={openMissingHandler}
          login={openLoginHandler}
          register={openRegisterHandler}
          user={user}
        />
        <Router>
          <Switch>
            <Route path='/' exact render={() => <Homepage />} />
            <Route render={() => <h1>Hello There</h1>} />
          </Switch>
        </Router>
      </Responsive>

      <RegisterModal isOpen={openRegister} onClose={closeRegisterHandler} />
      <LoginModal isOpen={openLogin} onClose={closeLoginHandler} />
      <AddMissingModal isOpen={openMissing} onClose={closeMissingHandler} />
      <AddFoundModal isOpen={openFound} onClose={closeFoundHandler} />
    </div>
  );
};

// const init = async () => {
//   const test = await api.getAllMissing();
//   console.log(test);
// };

export default App;
