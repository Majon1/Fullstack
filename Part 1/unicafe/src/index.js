import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.all === 0) {
  return (
    <div> No feedback given </div>
  )}
  return (
 <div>
  <div>good {props.pos}</div>
  <div>neutral {props.neu}</div>
  <div>bad {props.neg}</div>
  <div>all {props.all}</div>
  <div>average {props.all/3}</div>
  <div>positive {props.pos/props.all *100}%</div>
 </div>
)
}
const Button=({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
        <h2>Give feedback</h2>
        <Button onClick={() => setGood(good + 1)} text= 'good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
        <Button onClick={() => setBad(bad + 1)} text='bad'/>
        <h2>Statistics</h2>
        <Statistics pos={good} neu={neutral} neg={bad} all={good + neutral + bad} />
      </div>
  )

  }
ReactDOM.render(<App />,
  document.getElementById('root')
)

