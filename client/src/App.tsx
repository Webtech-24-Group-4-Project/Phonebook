import React, { useEffect } from 'react';
import axios from 'axios';
import { IContact } from './models/contact';
import defaultProfilePicture from './user_profile.png';

const App: React.FC = () => {
  const[contacts, setContacts] = React.useState<IContact[] | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:3003/contacts');
      setContacts(res.data.contacts);
    }
    catch (error) {
      console.error('Error fetching contacts:', error);
    }  
  };

  return (
    <div>
      <h2>Contacts</h2>
      {contacts ? (
        contacts.map((contact) => (
          <div key={contact._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img 
              src={contact.picture || defaultProfilePicture}
              style={{ width: '50px', height: '50px', marginRight: '10px' }} 
            />
            <div>
              <h3>{contact.firstName} {contact.lastName}</h3>
              <p>Address: {contact.address}</p>
              <h4>Phone Numbers:</h4>
              <ul>
                {contact.phoneNumbers.map((phone, index) => (
                  <li key={index}>
                    {phone.type}: {phone.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No contacts</p>
      )}
    </div>
  );
}

export default App;
