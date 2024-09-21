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

// don't know the id beforehand
const update = ({name, number}) => { 
    return(
        axios
            .get(`${baseUrl}?name=${name}`)
            .then(response => {
                const id = response.data[0].id;
                return(
                    axios
                        .put(`${baseUrl}/${id}`, {name, number})
                        
                )
            })
        )
        
}



export default{ getAll,create, erase, update }
