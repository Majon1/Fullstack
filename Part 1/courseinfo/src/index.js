import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}

const Content = (props) => {
  

  return (
    <div>
      <Part1 part1={props.parts[0].name} ex1={props.parts[0].exercises} />
      <Part2 part2={props.parts[1].name} ex2={props.parts[1].exercises} />
      <Part3 part3={props.parts[2].name} ex3={props.parts[2].exercises} />
    </div>
  )
}
const Part1 = (props) => {
  return (
    <div>
      <p> {props.part1} {props.ex1}</p>
    </div>
  )
}
const Part2 = (props) => {
  return (
    <div>
      <p> {props.part2} {props.ex2}</p>
    </div>
  )
}
const Part3 = (props) => {
  return (
    <div>
      <p> {props.part3} {props.ex3} </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>total: {props.parts[0].exercises + props.parts[1].exercises+ props.parts[2].exercises}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render
  (<App />,
    document.getElementById('root'))
