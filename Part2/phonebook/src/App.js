import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')
  const [shown, setShown] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }
useEffect(hook, [])
    
console.log('render', persons.length, 'persons')

const addPerson = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
  const nameObject = {
    name: newName,
    number: newNumber,
    id: persons.length + 1,
  }
  if (persons.some(person => person.name === newName)) {
    window.alert(newName + ' is already in phonebook!')
  }
  else {
    setPersons(persons.concat(nameObject))
    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      console.log(response)
    })
    setNewName('')
    setNewNumber('')
  }
}

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
const handleFind = (event) => {
  console.log('handlefind gets', event.target.value)
  setShown(event.target.value)
}

return (
  <div>
    <h2>Phonebook</h2>

    <Filter value={shown} handleFind={handleFind} />

    <h2>Add new contact</h2>

    <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} />

    <h2>Numbers</h2>

    <Names persons={persons} shown={shown} />

  </div>
)
}

export default App