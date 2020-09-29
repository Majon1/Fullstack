import React from 'react'

const Names =({ person }) => {
    console.log('this person', person);
    return (
    <p>{person.name} {person.number}</p>
    )
  }
  
  export default Names