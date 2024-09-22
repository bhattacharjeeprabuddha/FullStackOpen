const Persons = ({persons, erase}) => {
      return(
        <table>
            
            <tbody >
                {persons.map(person => 
                    <tr key={person.id} >
                        <td>{person.name}</td>
                        <td style={{color: 'blue'}}>{person.number}</td>
                        <td>
                            <button style={{color:'red'}} onClick={
                                ()=>erase(person.id, person.name)
                                }>
                                delete
                            </button>
                        </td>
                    </tr>)}

            </tbody>
        </table>
    )
}




export default Persons;