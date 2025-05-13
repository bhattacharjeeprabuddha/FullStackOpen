import CountriesService from "../services/countries"
import { useState } from "react"

const DisplaySingleCountry = ({singleCountry}) => {
    console.log(singleCountry)

    const [temp, setTemp] = useState(0);
    const [weatherIcon, setWeatherIcon] = useState("");
    const [wind, setWind] = useState(0);

    CountriesService
        .getOrdinatesByCity(singleCountry.capital)
        .then(({lat, lon}) => {
            return CountriesService
                .getWeatherByOrdinates(lat, lon)
                .then(response => {
                    setTemp(response.data.main.temp);
                    setWeatherIcon(response.data.weather[0].icon);
                    setWind(response.data.wind.speed);
                })
        })
    return (
        <>
            <h1>{singleCountry.name.common}</h1>
            <div>Capital {singleCountry.capital[0]}</div>
            <div>Area {singleCountry.area}</div>
            <h1>Languages</h1>
            <ul>
                {Object.values(singleCountry.languages).map((l, i) => 
                        <li key={i}>
                            {l}
                        </li>
                    )}
            </ul>
            <img src={singleCountry.flags.png} alt={singleCountry.flags.alt} />
            <h1>Weather in {singleCountry.capital[0]}</h1>
            <div>Temperature {temp} Celsius</div>
            <img src={` https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" />
            <div>Wind {wind} m/s</div>
             
            
            
        </>
    )   
}


export default DisplaySingleCountry