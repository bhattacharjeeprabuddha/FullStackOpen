import { useState } from 'react'
import Numbers from './components/Numbers'

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
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  // event handler : form input number
  const handleNumberChange = (event) => {
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
      
      <div>
        filter shown with <input type="text" onChange={filterByName}/>

      </div>

      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        
        <div><button type="submit">add</button></div>
      
      </form>
      
      <h2>Numbers</h2>
      <Numbers persons={persons} />
      
    </div>
  )
}

export default App