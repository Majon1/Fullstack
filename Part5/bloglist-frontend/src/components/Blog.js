import React, { useRef } from 'react'
import View from './ViewBlogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogRef = useRef()
  return (
    <div style={blogStyle}>
      <div>
  {blog.title} {blog.author} <View ref={blogRef}><p>{blog.url}</p><p>likes: {blog.likes}</p><p>{blog.user.name}</p></View>
      </div>
    </div>
  )
}

export default Blog
