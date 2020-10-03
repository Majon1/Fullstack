import React, { useState, useEffect } from 'react'
import Names from './components/Names'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import nameService from './services/names'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')
  const [shown, setShown] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])
    
console.log('render', persons.length, 'persons')

const removeP = (event, id) => {
  event.preventDefault()
  console.log('button clicked', event.target)
  
  const p =persons.filter(pers=> pers.id !== id)
  console.log('happening');
  const removepersons = persons.splice(p)
  nameService
      .delete(removepersons)
      .then(removepersons => {
        setPersons({removepersons});
      })
}


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

    nameService
      .create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
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
const handleShow = (event) => {
  console.log('Buttonevent', event.target.value)
  setShown(event.target.value)
}

return (
  <div>
    <h2>Phonebook</h2>

    <Filter value={shown} handleFind={handleFind} />

    <h2>Add new contact</h2>

    <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} />

    <h2>Numbers</h2>

    <Names persons={persons} shown={shown} removeP={removeP} handleShow={handleShow} setPersons={setPersons}/>

  </div>
)
}

export default App