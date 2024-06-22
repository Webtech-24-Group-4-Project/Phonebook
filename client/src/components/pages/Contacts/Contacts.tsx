import React, { useEffect } from 'react';
import axios from 'axios';
import { IContact } from '../../../models/contact';
import defaultProfilePicture from '../../../user_profile.png';
import CreateContactForm from '../../shared/create-contact-form/CreateContactForm';
import styles from './Contacts.module.css';

const Contacts: React.FC = () => {
    const [contacts, setContacts] = React.useState<IContact[] | null>(null);
    const [showCreateContactForm, setCreateContactForm] = React.useState(false);

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

    const handleCreateContact = () => {
        fetchContacts();
        setCreateContactForm(false);
    }

    return (
        <>
            <div>
                <h2>Contacts</h2>
                {contacts ? (
                    contacts.map((contact) => (
                        <div key={contact._id} className={styles.contactCard}>
                            <img
                                src={contact.picture || defaultProfilePicture}
                                alt="Contact image"
                                className={`${styles.profilePicture} ${styles.profilePic}`}
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

            <button onClick={() => setCreateContactForm(true)}>Create new contact</button>
            {showCreateContactForm && < CreateContactForm onContactCreated={handleCreateContact} onCancel={() => setCreateContactForm(false)} />}
        </>
    );
}

export default Contacts;
