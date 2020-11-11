import React, { useRef } from 'react'
import View from './ViewBlogs'

const Blog = ({ blog, addLike, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const remove = () => {
    if (blog.user.name === user.name) {
      return <button onClick={() => {removePost()}}>Delete</button>
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

  const blogRef = useRef()
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <View ref={blogRef}><p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={() => { add() }}>like</button></p>
          <p>{blog.user.name}</p>{ remove() }</View>
      </div>
    </div>
  )
}

export default Blog
