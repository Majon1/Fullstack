import React, { useState } from 'react'
import Names from './components/Names'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('add new name...')
  const [newNumber, setNewNumber] = useState('add new number...')
  const [shown, setShown] = useState([])

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
    console.log('handlefind gets', event)
    const search = event.target.value
    setShown(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
  }//data.filter(x => x.title.toLowerCase().includes(term.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input
        value={shown}
        onChange={handleFind} />
      </div>
      <h2>Add new contact</h2>
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
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{shown.map((person) =>
        <Names key={person.name} person={person} />
      )}
    </div></div>
  )
}

export default App