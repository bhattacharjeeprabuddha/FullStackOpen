const Persons = ({persons, erase}) => {
      return(
        <>
            {persons.map(person => 
                <p key={person.id}>
                    {person.name} 
                    {person.number} <button onClick={
                        ()=>erase(person.id, person.name)
                        }>
                        delete</button>
                </p>)}
        </>
    )
}




export default Persons;