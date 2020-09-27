import React, { useState } from 'react'
import Names from './components/Names'


const App = ({ person }) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '050', id: 1 },
  ])
  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form onSubmit={addPerson}>
          <div> name: <input
            value={newName}
            onChange={handleNameChange} />
          </div>
          <div>
            number: <input
              value={newNumber}
              onChange={handleNumberChange} />
          </div> <button type="submit">add</button>
        </form>
        <h2>Numbers</h2>
        {persons.map(person =>
          <Names key={person.name} person={person} />
        )}
      </div></div>
  )
}

export default App