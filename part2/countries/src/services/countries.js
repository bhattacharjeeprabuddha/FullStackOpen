import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    return (
        axios
            .get(baseUrl + "/all")
            .then(response => {
                return response.data;
            })
            
    )
}

const getCountryByName = (name) => {
    return (axios
            .get(baseUrl + `/name/${name}`)
            .then(response => {
                return response.data;
            })
    )
}


export default {getAllCountries, getCountryByName}