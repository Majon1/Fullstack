import React, { useState, useEffect } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import nameService from './services/names'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')
  const [shown, setShown] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const removeP = (id) => {
    console.log('pressing delete');
    const p = persons.find(p => p.id === id)
    const r = (window.confirm(`Do you want to delete ${p.name}?`))
    if (r === true){
    setErrorMessage(`${p.name} was deleted from phonebook!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    nameService
    .remove(id)
    .then(res => {
      const del = persons.filter(person => id !== person.id)
      console.log('deleting', id)
      setPersons(del)
    })}

    else{
      return null
    }

  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setErrorMessage(`${nameObject.name} was added to phonebook!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    if (persons.some(person => person.name === newName))
      {
        setErrorMessage(`${nameObject.name} is already in phonebook!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      }
    /* if (persons.some(person => person.name === newName && persons.number !== newNumber)) 
      {
        window.confirm({nameObject.name}, 'Already in phonebook, do you wish to update their phonenumber?')
      }*/
      
    else {
      setPersons(persons.concat(nameObject))

      nameService
        .create(nameObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
        })
      setNewName('')
      setNewNumber('')
    }
  }
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">{message}</div>
    )
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
      <Notification message={errorMessage} />
      <Filter value={shown} handleFind={handleFind} />


      <h2>Add new contact</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} />

      <h2>Numbers</h2>

      <Names persons={persons} shown={shown} removeP={removeP} />

    </div>
  )
}

export default App