import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setMessage(`new content: "${content}"`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}
const mapDispatchToProps = {
 createAnecdote, setMessage
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
