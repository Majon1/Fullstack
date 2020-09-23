import React from 'react';
import ReactDOM from 'react-dom';

const Course = (props) => {
  console.log('course works...', props)
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
    </div>
  // <Total total={course} />
  )
}
const Header = (props) => {
  console.log('props header works...', props)
  return (
    <div>
    <h2> <p>{props.course.name}</p></h2>
    </div>
  )
}
const Content = (props) => {
  console.log('content works...', props)
  return (
    <div>
      <Parts part={props.parts[1].name} ex={props.parts[1].exercises} />
    </div>)
}

const Parts = (props) => {
  console.log('part works...')
  return (
    <div>
      <p> {props.part} {props.ex}</p>
    </div>
  )
}
/*const Total = (props) => {
  return (
    <div>
      <p>Total: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}*/
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      }
    ]
  }
  console.log('app works...')
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render
  (<App />,
    document.getElementById('root'))
