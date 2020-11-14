import React, { useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const remove = () => {

    if (blog.user.name === user) {
      return <button id="remove" onClick={() => { removePost() }}>Delete</button>
    }
    else {
      return null
    }
  }

  const removePost = () => {
    const rem = {
      user: blog.user.id,
      id: blog.id
    }
    removeBlog(rem.id, rem)
  }

  const add = () => {
    const newLike = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    addLike(newLike.id, newLike)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='first'>
        <p className='title'> {blog.title} {blog.author}<button id="view" onClick={() => setVisible(true)}>view</button></p>
      </div>
      <div style={showWhenVisible}>
        <div className='toggleView'>
          <p>{blog.title}</p>
          <p> {blog.author}</p>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button id="like" onClick={() => {add()}}>like</button></p>
        </div>
        <p>{blog.user.name}</p> {remove()}
        <button onClick={() => setVisible(false)}>Hide</button>
      </div></div >
  )
}

export default Blog
