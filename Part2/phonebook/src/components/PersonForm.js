import React from 'react'

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, name, number }) => {
return (
    <form onSubmit={addPerson}>
    <div>
    name: <input value={name} onChange={handleNameChange} />
    </div>
    <div>
    number: <input value={number} onChange={handleNumberChange} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
)
}
export default PersonForm