import React, { useEffect } from 'react';
import axios from 'axios';
import { IContact } from '../../../models/contact';
import defaultProfilePicture from '../../../user_profile.png';
import ContactForm from '../../shared/contact-form/ContactForm';
import styles from './Contacts.module.css';

const Contacts: React.FC = () => {
    const [contacts, setContacts] = React.useState<IContact[] | null>(null);
    const [selectedContact, setSelectedContact] = React.useState<IContact | null>(null);
    const [showContactForm, setShowContactForm] = React.useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await axios.get('/contacts');
            setContacts(res.data.contacts);
        }
        catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleContactSubmit = () => {
        setShowContactForm(false);
        fetchContacts();
    };

    const hanfleDeleteContact = async (contactId: string) => {
        try {
            await axios.delete(`/contacts/${contactId}`);
            fetchContacts();
        }
        catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Contacts</h2>
                {contacts ? (
                    contacts.map((contact) => (
                        <div key={contact._id} className={styles.contactCard}>
                            <img
                                src={contact.pictureUrl || defaultProfilePicture}
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
                            <div>
                                <button onClick={() => { setSelectedContact(contact); setShowContactForm(true)} }>Edit</button>
                                <button onClick={() => hanfleDeleteContact(contact._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No contacts</p>
                )}
            </div>

            <button onClick={() => { setSelectedContact(null); setShowContactForm(true)} }>Create new contact</button>
            {showContactForm && <ContactForm contact={selectedContact} onSubmit={handleContactSubmit} onCancel={() => setShowContactForm(false)} />}
        </>
    );
}

export default Contacts;
