import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // state: random index for anecdotes[]
  const [selected, setSelected] = useState(0)

  // state: points[] for each anecdote with [0,0,0,...]
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));


  //event listener: vote button 
  const voteAnecdote = ()=> {
    let copyPoints = [...points];
    
    //update the current state of vote points for current anecdote
    const anecdoteIndex = selected;
    copyPoints[anecdoteIndex] += 1;
    setPoints(copyPoints);

  }
  
  //event listener: next anecdote button
  const nextAnecdote = ()=> {
    const randomIndex = Math.floor(Math.random()*anecdotes.length);
    setSelected(randomIndex);
  }

  //function: returns maximum vote and anecdote
  const maxVoteAnecdote = ()=>{
    const maxPoint = Math.max(...points);
    const i = points.indexOf(maxPoint);
    return [maxPoint, anecdotes[i]];
  }

  // return: root component App
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most values</h1>
      <p>{maxVoteAnecdote()[1]}</p>
      <p>has {maxVoteAnecdote()[0]} votes</p>


    </div>
  )
}

export default App