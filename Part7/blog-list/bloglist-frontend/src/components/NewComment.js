import React, { useState } from 'react'

const NewComment = (props) => {
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    event.preventDefault()
    props.createComment(comment)

    setComment('')
  }
  return (
    <div>
      <form onSubmit={handleComment}>
        <div>
          comment
          <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button>add comment</button>
        </div>
      </form>
    </div>
  )
}

export default NewComment