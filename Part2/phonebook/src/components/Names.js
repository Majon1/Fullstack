import React from 'react'

const Names = ({ persons, shown, handleShow }) => {
const filtering = persons.filter(person => person.name.toLowerCase().includes(shown.toLowerCase()))
  return (
    <div>
    {filtering.map(person => <li key={person.name}> {person.name} {person.number} 
  <button onClick={handleShow} value={persons.number}>Delete</button></li>)}
  </div>)
}
export default Names
