const Notification = ({ message }) => {
    let border = '4px solid green';
    let color = 'green';
    let backgroundColor = 'yellow';
    
    if (message === '') {
      return;
      
    } else {
      if (message.includes("removed")){
        border = '4px solid red';
        color = 'red';
        backgroundColor = 'lightgrey';
      }
      
    }

  return (
      <div className='notification' 
        style={{color: color,
            fontStyle: 'italic',
            fontSize: 24,
            backgroundColor: backgroundColor,
            border: border,
            borderRadius: 8,
            padding: 12,
        
            }
        }>
        
        {message}
      </div>
    )
  }





  export default Notification