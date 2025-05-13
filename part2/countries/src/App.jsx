import { useEffect, useState } from 'react'

import CountryForm from './components/countryForm'
import DisplayCountries from './components/DisplayCountries';
import countriesService from './services/countries'

function App() {
  const [countryNameInput, setCountry] = useState('');
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
      <p></p>
      <DisplayCountries filteredCountryNames={filteredCountryNames} singleCountry={singleCountry}/>
      <p></p>
    </>
    
  )
}

export default App;
