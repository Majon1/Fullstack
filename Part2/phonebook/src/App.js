import React, { useState } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState('add new number...')
  const [shown, setShown] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(newName + ' is already in phonebook!')
    }
    else {
      setPersons(persons.concat(nameObject))
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
    // const setS = (event.target.value)
    //setShown(persons.filter(person => person.name.toLowerCase().includes(setS.toLowerCase())))
    //data.filter(x => x.title.toLowerCase().includes(term.toLowerCase()))*/
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={shown} handleFind={handleFind} />

      <h2>Add new contact</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} />

      <h2>Numbers</h2>

      <Names persons={persons} shown={shown}/>

    </div>
  )
}

export default App