import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactsTitle, Container, FilterTitle, Title } from './App.styled';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(){
    const saveContact = localStorage.getItem('contacts'); // Получаем данные из localStorage.
    const parsedContacts = JSON.parse(saveContact) // Преобразуем данные из строки JSON в объект JavaScript.
    if(saveContact !== null){
      this.setState( { contacts:  parsedContacts} ); // Устанавливаем полученные контакты в обьект "contacts".
    }else{
      this.setState({ contacts: CONTACTS });
    }
  }

  componentDidUpdate(prevProps, prevState){
    const {contacts } = this.state;
    if( prevState.contacts !==  contacts ){
      // Сравниваем текущие контакты с предыдущим обьектом контактов.
      localStorage.setItem('contacts', JSON.stringify(contacts));
      // Если контакты изменились, сохраняем их в localStorage.
    }
  }
 

  handleSubmit = data => {
    const equalName = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (equalName) {return alert(equalName.name + ' is already in contacts.')};

    this.setState(prev => ({ contacts: [{id: nanoid(), ...data}, ...prev.contacts], }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContacts = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }
    });
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.handleSubmit} />
        <ContactsTitle>Contacts</ContactsTitle>
        <FilterTitle>Find contacts by name</FilterTitle>
        <Filter value={filter} onChange={this.changeFilter} />
        {contacts.length ? (
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContacts}
          />
        ) : (
          <p>No any contacts</p>
        )}
      </Container>
    );
  }
}

export default App;
