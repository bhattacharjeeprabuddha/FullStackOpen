const DisplayCountries = ({countries}) => {
    return (
        <> Countries
        <ul>
            {
                countries.map(country => {
                    <li>{country}</li>
                })
            }
        </ul>
        </>
    )
}


export default DisplayCountries