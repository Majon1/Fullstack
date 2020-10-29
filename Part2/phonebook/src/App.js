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
      nameService
        .remove(id)
        .then(res => {
          const del = persons.filter(person => id !== person.id)
          console.log('deleting', id)
          setPersons(del)

          setErrorMessage(`${p.name} was deleted from phonebook!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`${p.name} was already deleted from phonebook!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    else {
      return null
    }
  }

  const updateNumber = (person) => {
    const num = persons.find(p => p.name.toLowerCase() === person.name.toLowerCase()).id
    person = { ...person, id: num }

    nameService
      .update(num, person)
      .then(response => {
        const update = persons.map(p => p.id !== num ? p : response)
        setPersons(update)
        setNewName('')
        setNewNumber('')

        setNotifications(`Phonenumber of ${response.name} updated!`)
        setTimeout(() => {
          setNotifications(null)
        }, 5000)
      })
      .catch(error => {
        if (error.resonse.data.error === undefined) {
          setErrorMessage(`${person.name} was already deleted from server!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        else {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setNotifications(null)
          }, 5000)
        }
        setNewName('')
        setNewNumber('')

      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: Math.random() < 0.5,
    }

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber)) {
      setErrorMessage(`${nameObject.name} is already in phonebook!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    else if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase() && persons.number !== newNumber)) {

      const g = window.confirm(`${nameObject.name} is already in phonebook, do you wish to update their phonenumber?`)
      if (g === true) {
        updateNumber(nameObject)
      }
      else {
        return null
      }
    }
    else {


      nameService
        .create(nameObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNotifications(`${nameObject.name} was added to phonebook!`)
          setTimeout(() => {
            setNotifications(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setNotifications(null)
          }, 5000)
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