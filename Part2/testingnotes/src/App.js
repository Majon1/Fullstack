import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([]) //for empty list useState([])
  const [newNote, setNewNote] = useState('') // content of textbox
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, []) //<<<<< DEPENDENCY ARRAY!!!!

  /*useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, []) */////<<<---DEPENDENCY ARRAY IS THIS >>>[]<<<< 
  console.log('render', notes.length, 'notes')

  //reflects current value of input, now we can create new notes!!
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  //inside app since it's only called from app! MAKES TEXT SHOW UP IN CONSOLE!
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  //stores a list of all the notes to be displayed
  //IF ELSE!!!!!! 
  const notesToShow = showAll
    ? notes //if showAll = true
    : notes.filter(note => note.important) //else
  //IF ELSE!!!!!!!!!!!!
  //Filter works as map, creates an array

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
    </div>//form gives box and buttons
    //sethowAll
  )
}

export default App