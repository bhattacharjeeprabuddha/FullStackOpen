import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // initialize persons with data fetch from local server
  useEffect(() => {
      personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }, []);
  
  // event handler : from input name
  const onChangeName = (event) => {
    setNewName(event.target.value);
  }

  // event handler : form input number
  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  // event handler : from submit
  const addNewPerson = (event) => {
    event.preventDefault();
    
    if (persons.map(p => p.name).includes(newName)){
      alert(`${newName} is already added to phonebook`);
      
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length+1 };
      // send newPerson to server
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      } );
      
      setNewName('');
      setNewNumber('');
    }
  }

  // event handler for filter by name input
  const filterByName = (event) => {
    const name = event.target.value.toLocaleLowerCase();
    const filteredPersons = persons.filter(p => 
      p.name.toLocaleLowerCase().includes(name));
    
    setPersons(filteredPersons);
    
    

  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterFunction={filterByName} />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addNewPerson} onChangeName={onChangeName} 
        onChangeNumber = {onChangeNumber} newName = {newName} 
        newNumber = {newNumber}
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} />
      
    </div>
  )
}

export default App