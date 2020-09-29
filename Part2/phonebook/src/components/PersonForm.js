import React from 'react'

const PersonForm = ({ addPerson, onChangeName, onChangeNumber, name, number }) => {
return (
    <form onSubmit={addPerson}>
    <div>
    name: <input value={name} onChange={onChangeName} />
    </div>
    <div>
    number: <input value={number} onChange={onChangeNumber} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
)
}
export default PersonForm