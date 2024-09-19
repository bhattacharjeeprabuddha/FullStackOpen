const filterByName = ({filterFunction}) => {
    return(
        <>
            filter by name: <input type="text" onChange={filterFunction} />
        </>
        
        
    );
}


export default filterByName;