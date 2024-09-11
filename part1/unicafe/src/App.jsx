import { useState } from 'react'

// Component
const Button = ({state, changeState, text}) => {
  const increaseByOne = () => changeState(state + 1);
  
  return(
    <>
      <button onClick={increaseByOne}>{text}</button>
    </>
  )
} 

// Component 
const StatisticLine = (props) => {
  return(
    <>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>

      </tr>
    </>
  )

}


// Component
const Statistics = (props) => {
  const [good, neutral, bad] = props.states;
  
  if (good===0 && neutral===0 && bad===0){
    return <><p>No feedbacks given</p></>
  } else{
    const all = good + neutral + bad;
    const average = (good-bad) / all;
    const positive = (good / all) * 100
    
    return(
      <>
        <table>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
          
        </table>
    
        
      </>
    )
  }
}


// root Component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button state={good} changeState={setGood} text='good'/>
      <Button  state = {neutral} changeState={setNeutral} text='neutral'/>
      <Button  state = {bad} changeState={setBad} text='bad'/>

      <h1>statistics</h1>
      <Statistics states = {[good, neutral, bad]}/>

    </div>
  )
}











export default App
