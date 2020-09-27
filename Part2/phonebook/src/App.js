import React, { useState } from 'react'
import Names from './components/Names'


const App = ({ person }) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')
  const [inputs, setFiltered] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  const filter = () => 
  persons.filter(name => 
    name.includes(inputs)).map(filtered => (
      <li>{filtered.name}</li>
    ))

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFiltered(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <form onSubmit={filter}>
        <div>
          filter shown with:  <input
          value={inputs}
          onChange={handleFilter} />
        </div>
        </form>
      </div>
      <h2>Add new contact</h2>
      <div>
        <form onSubmit={addPerson}>
          <div> 
            name: <input
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