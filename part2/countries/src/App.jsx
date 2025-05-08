import { useState, useEffect } from 'react'
import CountryForm from './components/countryForm'
import countriesService from './services/countries'
import DisplayCountries from './components/DisplayCountries';

// import './App.css'

function App() {
  const [countryNameInput, setCountry] = useState('');
  // const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState({});
  const [countriesNames, setCountriesNames] = useState([]);
  const [filteredCountryNames, setFilteredCountryNames] = useState([]);


  // get all countries names in first render
  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(data => {
        setCountriesNames(data.map(c => c.name.common))
      })
  }, []);


  // filter names on input change
  useEffect(() => {
    const matches = countriesNames
      .filter(name => name.toLowerCase().includes(countryNameInput.toLowerCase()));
  
    setFilteredCountryNames(matches);
  
    if (matches.length === 1) {
      countriesService.getCountryByName(matches[0]).then(data => setSingleCountry(data));
    }
  }, [countryNameInput]); 
  
  
  

  return (
    <>
      <CountryForm country={countryNameInput} setCountry={setCountry}/>
      <DisplayCountries filteredCountryNames={filteredCountryNames} singleCountry={singleCountry}/>
    </>
    
  )
}

export default App;
