import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  
  // event handler onChange : from input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  // event handler onSubmit : from submit
  const addNewPerson = (event) => {
    event.preventDefault();
    
    if (persons.map(p => p.name).includes(newName)){
      alert(`${newName} is already added to phonebook`);
      
    } else {
      const newPerson = { name: newName };
      setPersons(persons.concat(newPerson));
      setNewName('');
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
          <button type="submit">add</button>
        </div>
      
      </form>
      
      <h2>Numbers</h2>
      <Numbers persons={persons} />
      
    </div>
  )
}

export default App