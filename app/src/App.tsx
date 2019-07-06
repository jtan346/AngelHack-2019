import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Homepage from './pages/Homepage';
import LoginModal from './components/Modal/LoginModal';
import AddMissingModal from './components/Modal/AddMissingModal';
import Header from './components/Header';
import RegisterModal from './components/Modal/RegisterModal';
Amplify.configure(awsconfig);

const App: React.FC = () => {
  let user = 'John';

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

  return (
    <div className='App'>
      <Header missing={openMissingHandler} login={openLoginHandler} register={openRegisterHandler} user={user} />
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Homepage />} />
          <Route render={() => <h1>Hello There</h1>} />
        </Switch>
      </Router>
      <RegisterModal isOpen={openRegister} onClose={closeRegisterHandler} />
      <LoginModal isOpen={openLogin} onClose={closeLoginHandler} />
      <AddMissingModal isOpen={openMissing} onClose={closeMissingHandler} />
    </div>
  );
};

// const init = async () => {
//   const test = await api.getAllMissing();
//   console.log(test);
// };

export default App;
