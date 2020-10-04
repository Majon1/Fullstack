import React from 'react'


const Names = ({ persons, shown, removeP }) => {
  const filtering = persons.filter(person => person.name.toLowerCase().includes(shown.toLowerCase()))

  return (
    <div>
      {filtering.map(person => <div key={person.name}> {person.name} {person.number}
        <button onClick={() => removeP(person.id)}>Delete</button></div>)}
    </div>)

}
export default Names

