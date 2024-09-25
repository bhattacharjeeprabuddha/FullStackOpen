const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div 
        className="error" 
        style={{color: 'green', fontStyle: 'italic',fontSize: 16}}>
        
        {message}
        
      </div>
    )
  }
  
  export default Notification