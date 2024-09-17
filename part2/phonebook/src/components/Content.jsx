import Part from './Part'


const Content = ({parts}) => {
    return(
        <>
            <ul>
                {parts.map(part =>
                    <Part part={part} key={part.id} />
                )}
                
                <h3>
                    total of {parts.reduce(
                        (sum, part) => 
                            sum + part.exercises, 0
                    )} exercises                
                </h3>
                

            </ul>
            
            
        </>

        

    );
}

export default Content              