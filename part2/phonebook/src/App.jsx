import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  
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
      setPersons(persons.concat(newPerson));
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