import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id='title'
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange} />
        </div>
        <div>
          Author:
          <input
            id='author'
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange} />
        </div>
        <div>
          Url:
          <input
            id='url'
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange} />
        </div>
        <button id="newBlog" type="submit">Create</button>
      </form>
    </div>
  )
}
export default BlogForm




