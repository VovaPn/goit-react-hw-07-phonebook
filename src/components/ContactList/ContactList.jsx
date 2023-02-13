import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectFilterContacts } from 'redux/selectors';
import {
  deleteContacts,
  fetchContacts,
} from 'redux/contacts/contacts-operations';

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filterContacts = useSelector(selectFilterContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const findContact = () => {
    return contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filterContacts.trim().toLowerCase());
    });
  };
  const foundContacts = findContact();

  return (
    <ul className={s.contactList}>
      {foundContacts.map(({ id, name, number, phone }) => {
        return (
          <li className={s.contact} key={id}>
            <p className={s.contactInfo}>
              {name}: {phone}
            </p>
            <button type="button" onClick={() => dispatch(deleteContacts(id))}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.protoTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
