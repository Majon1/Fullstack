import React from 'react';
import ReactDOM from 'react-dom';

const Course = (props) => {
  return (
    <div>
      <Header courseN={props.course.name} />
      <Content parts={props.course.parts} />
      <Total amount={props.course.parts}/>
    </div>
  )
}
const Header = (props) => {
  console.log('header', props);
  return (
    <div>
      <h2><p>{props.courseN}</p></h2>
    </div>
  )
}
const Content = (props) => {
  console.log('content', props);
  return (
    <div>
      <Parts parts={props.parts} />
    </div>
  )
}

const Parts = (props) => {
  console.log('parts print', props);
    const cparts = props.parts.map(part => <p key={part.id}>
    {part.name + ' ' + part.exercises}</p>)
      return (
       cparts)
}

const Total = (props) => {
  console.log('total prints', props);
  const total = props.amount.reduce((sum, order) => {
    console.log('what happens', sum, order)
   return sum + order.exercises
   }, 0)
   return (<h4><p> total of {total} exercises</p></h4> )
}
   

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

ReactDOM.render
  (<App />,
    document.getElementById('root'))
