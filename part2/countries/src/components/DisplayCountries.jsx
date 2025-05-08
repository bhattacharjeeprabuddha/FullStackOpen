/* eslint-disable react/prop-types */

const DisplayCountries = ({filteredCountryNames, singleCountry}) => {

        if(Object.keys(singleCountry).length >= 1) {
            console.log(singleCountry)
            return (
                <>
                    <div>Capital {singleCountry.capital[0]}</div>
                    <div>Area {singleCountry.area}</div>
                    <ul>
                        {Object.values(singleCountry.languages).map((l, i) => 
                                <li key={i}>
                                    {l}
                                </li>
                            )}
                    </ul>
                    <img src={singleCountry.flags.png} alt={singleCountry.flags.alt} />
                </>    
            )
        }
    
        if(filteredCountryNames.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }

        return (
            <> 
            Countries
            <ul>
                { 
                    filteredCountryNames.map((country, i) => {
                        return <li key={i}>{country}</li>
                    })
                }
            </ul>
            </>
        )
    }

    



export default DisplayCountries