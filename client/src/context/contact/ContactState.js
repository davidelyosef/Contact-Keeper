import React, { useReducer } from 'react';
import {v4 as uuid} from "uuid"
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTERS,
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Harry White',
                email: 'harry@gmail.com',
                phone: '111-111-111',
                type: 'professional'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '222-222-222',
                type: 'personal'
            }
        ]
    };

    // Implement them with our useReducer Hook
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // Delete contact

    // Update contact

    // Set current contact

    // Clear current contact

    // Filter contacts

    // Clear filter

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
}

export default ContactState;