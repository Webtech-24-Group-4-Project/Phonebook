import React, { useEffect } from 'react';
import axios from 'axios';
import { IContact } from './models/contact';
import defaultProfilePicture from './user_profile.png';
import Contacts from './components/pages/Home/Contacts';

const App: React.FC = () => {

  return (
    <>
      <Contacts />
    </>
  );
}

export default App;
