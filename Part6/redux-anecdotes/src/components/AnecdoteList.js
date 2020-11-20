import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (id, anecdote) => {
    console.log('vote', id)
    props.addVote(id, anecdote)
    props.setMessage(`You voted on "${anecdote.content}"`, 5)
  }

  const filtering = (filter, anecdotes) => {
    const filtered = anecdotes.filter(an => an.content.toLowerCase().includes(filter.toLowerCase()))
    
    return filtered
  }

  const sortedAnecdotes = (anecdotes) => {
    return (anecdotes.sort((x, y) => y.votes - x.votes))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes(filtering(props.filter, props.anecdotes)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>)
   }

   const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
    }
  }
  const mapDispatchToProps = {
    addVote, setMessage
  }

   const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
