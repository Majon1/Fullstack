import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div> No feedback given </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <tr>
      <td><Statistic text='good'/></td><td> <Statistic value={props.pos}/></td>
      </tr><tr>
      <td> <Statistic text='neutral'/></td><td><Statistic value={props.neu} /></td>
      </tr><tr>
      <td> <Statistic text='bad'/></td><td><Statistic value={props.neg} /></td>
      </tr><tr>
      <td> <Statistic text='all'/></td><td><Statistic value={props.all} /></td>
      </tr><tr>
      <td> <Statistic text='average' /></td><td><Statistic value={props.avg} /></td>
      </tr><tr>
      <td> <Statistic text='positive' /></td><td><Statistic value={props.proc}/></td>
      </tr> 
      </tbody>
    </table>
    </div>
  )
}
const Statistic = (props) => {
  if (props.text=== 'positive') {
    return (
    <div>
    {props.text} {props.value}
  </div>
    )
  }
  return (
    <div>
    {props.text} {props.value}
  </div>
  )
}
const Button = ({ onClick, text }) => (
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
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h2>Statistics</h2>
      <Statistics pos={good} neu={neutral} neg={bad} all={good + neutral + bad} avg={(good - bad) / (good + neutral + bad)} proc={good / (good + neutral + bad) * 100 + '%'} />
    </div>
  )
}
ReactDOM.render(<App />,
  document.getElementById('root')
)

