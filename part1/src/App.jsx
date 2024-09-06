const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content 
        parts={[part1, part2, part3]} 
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]}/>
      
      
      
    </div>
  )
}


const Header = (props)=>{
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props)=>{
  const contentArray = [];
  for(let i=0; i<props.parts.length; i++){
    contentArray.push(
    <p>{props.parts[i]} {props.exercises[i]}</p>
    )
  }
  return(
    <>
      {contentArray}
    </>
  )
}

const Total = (props)=>{
  let total = 0
  for (const ex of props.exercises){
    total += ex 
  }
  return(
    <p>Number of exercises {total}</p>
  )
}










export default App