import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = async (id, anecdote) => {
    console.log('vote', id)
    dispatch(addVote(id, anecdote))
    dispatch(setMessage(`You voted on "${anecdote.content}"`, 5))
  }

  const filtering = () => {
    let list = [...anecdotes]
    let filters = filter
    let filtered = list.filter(an => an.content.toLowerCase().includes(filters.toLowerCase()))
    
    return filtered
  }

  const sortedAnecdotes = (anecdotes) => {
    return (anecdotes.sort((x, y) => y.votes - x.votes))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes(filtering()).map(anecdote =>
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
export default AnecdoteList