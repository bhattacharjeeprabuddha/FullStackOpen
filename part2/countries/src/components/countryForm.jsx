const CountryForm = ({country, setCountry}) => {
    return (
        <form >
            <label 
                style={{fontSize: 24,
                        fontWeight: 'bold'}
                }>
                
                find countries <input 
                    type="text" 
                    name="country"
                    value={country}
                    onChange={event => setCountry(event.target.value)}
                />

            </label>
      </form>
    )
};


export default CountryForm;