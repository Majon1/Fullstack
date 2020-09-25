import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
const [selected, setSelected] = useState(0)
 const [vote, setVote] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))

  const selectValue = () => {
      setSelected(Math.floor(Math.random() * 6))
    }

   const AddVote = () => {
      const copy = [...vote]
      copy[selected] += 1
      setVote(copy)
      console.log('added vote', selected);
    }
    const MaxVotes = () => {
     let result = vote.indexOf(Math.max(...vote))
     console.log('result', result)
     if (result > 0){
     return (
      <div> {anecdotes[result]}
      <p>Has {vote[result]} votes </p>
      </div>
     )}
     if (result <= 0){
    return (<div>No votes</div>) }}
  
   console.log('selected ', vote);
    return (
    <div>
      <h2>Anecdotes</h2>
      <p> {props.anecdotes[selected]} </p>
      <p>Has {vote[selected]} votes</p> 
      <Button onClick={AddVote} text='vote'/> 
      <Button onClick={selectValue} text='next anecdote'/>
        <h2>Highest vote</h2>
        <MaxVotes/>
    </div> 
  )
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)