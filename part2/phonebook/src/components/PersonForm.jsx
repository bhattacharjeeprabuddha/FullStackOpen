 const PersonForm = (props) => {
    const onSubmit = props.onSubmit;
    const onChangeName = props.onChangeName;
    const onChangeNumber = props.onChangeNumber;
    const newName = props.newName;
    const newNumber = props.newNumber;

    return(
        <>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={newName} onChange={onChangeName}/>
                </div>
            
                <div>
                    number: <input value={newNumber} onChange={onChangeNumber}/>
                </div>
            
                <div>
                    <button type="submit" style={{color:'green'}}>add</button>
                </div>
      
            </form>
        </>
    )
}


export default PersonForm;