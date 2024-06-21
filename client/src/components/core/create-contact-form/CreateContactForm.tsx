import React, { useState } from 'react';
import axios from 'axios';
import { CreateContactFormProps } from './CreateContactForm.types';

const CreateContactForm: React.FC<CreateContactFormProps> = ({ onContactCreated, onCancel }) => {
    const [createForm, setCreateForm] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumbers: [
            {
                type: '',
                number: ''
            }
        ]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCreateForm({ ...createForm, [name]: value });
    }

    const handlePhoneNumberChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const phoneNumbers = [...createForm.phoneNumbers];
        phoneNumbers[index] = { ...phoneNumbers[index], [name]: value };
        setCreateForm({ ...createForm, phoneNumbers });
    };

    const handleAddPhoneNumber = () => {
        setCreateForm({ ...createForm, phoneNumbers: [...createForm.phoneNumbers, { type: '', number: '' }] });
    };

    const handleRemovePhoneNumber = (index: number) => {
        const phoneNumbers = createForm.phoneNumbers.filter((_, i) => i !== index);
        setCreateForm({ ...createForm, phoneNumbers });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3003/contacts', createForm);
            onContactCreated();
            setCreateForm({
                firstName: '',
                lastName: '',
                address: '',
                phoneNumbers: [
                    {
                        type: '',
                        number: ''
                    }
                ]
            });
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Create New Contact</h2>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={createForm.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={createForm.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={createForm.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <h4>Phone Numbers:</h4>
                    {createForm.phoneNumbers.map((phone, index) => (
                        <div key={index}>
                            <select
                                name="type"
                                value={phone.type}
                                onChange={(e) => handlePhoneNumberChange(index, e)}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="mobile">Mobile</option>
                                <option value="work">Work</option>
                                <option value="home">Home</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="text"
                                name="number"
                                value={phone.number}
                                onChange={(e) => handlePhoneNumberChange(index, e)}
                                required
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => handleRemovePhoneNumber(index)}>
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddPhoneNumber}>
                        Add Phone Number
                    </button>
                </div>
                <button type="submit">Create Contact</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </>
    );
}

export default CreateContactForm;
