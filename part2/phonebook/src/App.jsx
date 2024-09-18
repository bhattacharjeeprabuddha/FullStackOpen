import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
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
      const newPerson = { name: newName, number: newNumber };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }



  return (
    <div>
      {/* <div>debug: {newName}</div> */}

      <h2>Phonebook</h2>
      
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