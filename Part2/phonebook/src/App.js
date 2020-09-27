import React, { useState } from 'react'
import Names from './components/Names'


const App = ({ person }) => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
    id:1 
  },
  ]) 
  const [ newName, setNewName ] = useState('add new name...')

  const addPerson =  (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
   // console.log(event.target.value)
    setNewName(event.target.value)

  }
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          <form onSubmit={addPerson}>
            name: <input 
            value={newName} 
            onChange={handleNameChange}/>
          <button type="submit">add</button>
        </form> 
      <h2>Numbers</h2>
        {persons.map(person =>
        <Names key={person.id} person={person}/>
        )}
    </div></div>
  )
}

export default App