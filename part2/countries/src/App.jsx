import { useState, useEffect } from 'react'
import CountryForm from './components/countryForm'
import countriesService from './services/countries'
import DisplayCountries from './components/DisplayCountries';
import axios from 'axios'
// import './App.css'

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);


  axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/name/')
      .then(response => {
          setCountries(response.data)
      });
    
  


  return (
    <>
      <ul>{countries}</ul>
      <CountryForm country={country} setCountry={setCountry}/>
      <DisplayCountries countries={countries}/>
    </>
    
  )
}

export default App;
