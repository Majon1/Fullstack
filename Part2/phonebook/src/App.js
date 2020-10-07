import React, { useState, useEffect } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import nameService from './services/names'
import NotificationError from './components/NotificationError'
import './index.css'
import NotificationMessages from './components/NotificationMessages'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')
  const [shown, setShown] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifications, setNotifications] = useState(null)

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
    if (r === true) {
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
        })
    }
    else {
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

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber)) {
      setErrorMessage(`${nameObject.name} is already in phonebook!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase() && persons.number !== newNumber)) {
      const num = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
      const g = window.confirm(`${nameObject.name} is already in phonebook, do you wish to update their phonenumber?`)
      if (g === true) {
        nameService
      .update(num.id, nameObject)
      .then(response => {
        const update = persons.map(p => p.id !== num.id ? p : response)
        setPersons(update)
      })
      setNotifications(`Phonenumber of ${nameObject.name} updated!`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
      }

      else {
        return null
      }}

    else {
      //  setPersons(persons.concat(nameObject))
      setNotifications(`${nameObject.name} was added to phonebook!`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
      nameService
        .create(nameObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
        })

    }
    setNewName('')
    setNewNumber('')
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
      <NotificationError message={errorMessage} />
      <NotificationMessages message={notifications} />
      <Filter value={shown} handleFind={handleFind} />


      <h2>Add new contact</h2>

      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} />

      <h2>Numbers</h2>

      <Names persons={persons} shown={shown} removeP={removeP} />

    </div>
  )
}

export default App