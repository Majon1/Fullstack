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
      <Part1 contentpart1={props.part1} exercises={props.exercises1} />
      <Part2 contentpart2={props.part2} exercises={props.exercises2} />
      <Part3 contentpart3={props.part3} exercises={props.exercises3} />
    </div>
  )
}
const Part1 = (props) => {
  return (
    <div>
      <p> {props.contentpart1} {props.exercises}</p>
    </div>
  )
}
const Part2 = (props) => {
  return (
    <div>
      <p> {props.contentpart2}  {props.exercises}</p>
    </div>
  )
}
const Part3 = (props) => {
  return (
    <div>
      <p> {props.contentpart3} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>{props.total}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />

    </div>
  )
}


ReactDOM.render
  (<App />,
    document.getElementById('root'))
