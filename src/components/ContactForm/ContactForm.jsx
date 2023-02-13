import React, { useState } from 'react';
import s from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contacts/contacts-operations';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
    }
  };

  const formSubmit = newContact => {
    const isExist = contacts.find(
      cont =>
        cont.name.toLowerCase().trim() === newContact.name.toLowerCase().trim()
    );
    if (isExist) {
      return alert(`${newContact.name} is already in contacts`);
    } else if (
      (newContact.name.trim() === '', newContact.phone.trim() === '')
    ) {
      return alert('Please, fill all fields');
    }
    dispatch(addContacts(newContact));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    formSubmit({ name, phone, id: nanoid() });
    setName('');
    setPhone('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button>Add contact</button>
    </form>
  );
};
