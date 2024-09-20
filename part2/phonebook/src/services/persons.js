import axios from "axios";


const baseUrl = 'http://localhost:3001/persons'

// fetch all person resources from server
const getAll = () => {
    return(
        axios
        .get(baseUrl)
        .then(response => response.data)
    );

}


const create = (newPerson) => {
    return(
        axios
        .post(baseUrl, newPerson)
        .then(response => response.data)
    );
}


const erase = (id, name, setPersons) => {
    window.confirm(`Delete ${name} ?`);
    return(
        axios
        .delete(`${baseUrl}/${id}`)
        
    )
        
    
}



export default{ getAll,create, erase }
