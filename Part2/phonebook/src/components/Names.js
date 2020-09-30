import React from 'react'

const Names = ({ persons, shown }) => {

  return (
    <div>
    {persons.filter(a => a.name.toLowerCase().includes(shown.toLowerCase())).map(a => <div key={a.name}> {a.name} {a.number}</div>)}
  </div>)
}

export default Names