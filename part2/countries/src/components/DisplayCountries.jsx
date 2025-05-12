/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"

import DisplaySingleCountry from "./DisplaySingleCountry"
import countriesService from '../services/countries'

const DisplayCountries = ({filteredCountryNames, singleCountry}) => {

        const [showCountry, setShowCountry] = useState({});

        // if single country object is non-empty
        if(Object.keys(singleCountry).length >= 1) {
            // console.log(singleCountry)
            return (<DisplaySingleCountry singleCountry={singleCountry}/>)
        }
    
        if(filteredCountryNames.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }

        if(Object.keys(showCountry).length >= 1) {
            return <DisplaySingleCountry singleCountry={showCountry} />
        }

        return (
            <> 
            Countries
            <ul>
                { 
                    filteredCountryNames.map((country, i) => {
                        return <li key={i}>
                                    {country} 
                                    
                                    <button onClick={() => {                                        
                                        countriesService
                                            .getCountryByName(country)
                                            .then(data => setShowCountry(data));
                                    }}> Show
                                    </button>
                                    
                                    
                                </li>
                    })
                }
            </ul>
            
        
            </>
        )
    }

    



export default DisplayCountries