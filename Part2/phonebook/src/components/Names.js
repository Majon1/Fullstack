import React from 'react'

const Names =({ person }) => {
    console.log('this person', person);
    return (
    <li>{person.name}</li>
    )
  }
  
  export default Names