import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState('');


  // set notification to null
  const setNotificationToNull = () => {
    setNotification('');
  }
  
  // get all data from server (called for rerendering the app whenever needed)
  const getAll = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      });
  }
  

  // initialize persons with data fetch from local server
  useEffect(getAll, []);
  
  // event handler : from input name
  const onChangeName = (event) => {
    setNewName(event.target.value);
  }

  // event handler : form input number
  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  // event handler : form submit
  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    
    // change number if already exists
    if (persons.map(p => p.name).includes(newName)){
      alert(`${newName} is already added to phonebook, replace the old number with a new one ?`);
      personService
        .update(newPerson)
        .then(()=>{
          getAll();
          setNotification(`${newName} successfully updated to new number`);
          setTimeout(setNotificationToNull, 3000);
          }
        )
        .catch((error)=>{
          setNotification(`Information of ${newName} already removed from server`);
          getAll();
          
        })
        
      
      
        

      
      
    } else {
      // send newPerson to server
      personService
        .create(newPerson)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNotification(`${newName} successfully added to phonebook`);
        setTimeout(setNotificationToNull, 3000);
      
        
      });

      
      
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

  // event handler : delete button for each person
  const erase = (id, name) => {
    personService
      .erase(id, name)
      .then(()=>{
        getAll();
        setNotification(
          
            `${name} successfully removed from phonebook`
          
        );
        setTimeout(setNotificationToNull, 3000);
      })
      
    
    
    

  }
  


  return (
    <div>
      <Notification message={notification} />
      <h1>Phonebook</h1>
      
      <Filter filterFunction={filterByName} />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addNewPerson} onChangeName={onChangeName} 
        onChangeNumber = {onChangeNumber} newName = {newName} 
        newNumber = {newNumber}
      />
      
      <h1>Numbers</h1>
      <Persons persons={persons} erase={erase} />
      
    </div>
  )
}

export default App