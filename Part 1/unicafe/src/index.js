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
       <Statistic text='good' value ={props.pos}/>
      </tr>
      <tr>
     <Statistic text='neutral' value ={props.neu}/>
      </tr>
      <tr>
      <Statistic text='bad' value ={props.neg}/>
      </tr>
      <tr>
      <Statistic text='all' value ={props.all}/>
      </tr>
      <tr>
      <Statistic text='average' value ={props.avg}/>
      </tr>
      <tr>
      <Statistic text='positive' value ={props.proc}/>
      </tr>
    </tbody>
    </table>
    </div>
  )
}
const Statistic = (props) => {
  return (
   <div>
      <td>{props.text}</td> <td>{props.value}</td>
 </div> )
}
   /* <table>
      <tbody>
        <tr>
          <td> good </td><td> {props.pos}</td>
        </tr>
        <tr>
          <td>neutral </td><td>{props.neu}</td>
        </tr>
        <tr>
          <td>bad </td><td>{props.neg}</td>
        </tr>
        <tr>
          <td>all </td><td>{props.all}</td>
        </tr>
        <tr>
          <td>average</td><td> {(props.pos - props.neg) / props.all}</td>
        </tr>
        <tr>
          <td>positive</td><td> {props.pos / props.all * 100}%</td>
        </tr>
        </tbody>
    </table> */
  

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
      <Statistics pos={good} neu={neutral} neg={bad} all={good + neutral + bad} avg={(good-bad)/(good + neutral + bad)} proc={good/(good + neutral + bad)* 100}/>
    </div>
  )

}
ReactDOM.render(<App />,
  document.getElementById('root')
)

