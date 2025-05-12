const DisplaySingleCountry = ({singleCountry}) => {
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


export default DisplaySingleCountry