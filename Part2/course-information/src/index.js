import React from 'react';
import ReactDOM from 'react-dom';

const Course = (props) => {

  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )// <Total parts={props.course.parts} />
}
const Header = (props) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}
const Content = (props) => {
  let i = 0
  //const copy = [...props.parts]
 // copy[i] += 1
    return (
      <div>
        <Parts part={props.parts[i].name} ex={props.parts[i].exercises} />
      </div>)
  }

const Parts = (props) => {
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

  return <Course course={course} />
}

ReactDOM.render
  (<App />,
    document.getElementById('root'))
