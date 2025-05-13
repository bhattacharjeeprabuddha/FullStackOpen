import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

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

const getOrdinatesByCity = (name) => {
    return (
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${api_key}`)
            .then(response => {
                return response.data[0];
            })
    )
}

const getWeatherByOrdinates = (lat, lon) => {
    return(
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
            .then(response => {
                return response
            })
    )
}






export default {getAllCountries, getCountryByName, getOrdinatesByCity, getWeatherByOrdinates}