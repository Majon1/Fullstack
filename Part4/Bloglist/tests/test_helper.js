const Blog = require('../models/blog')
const User = require('../models/user')

const initialNotes = [
    {
        title: 'a',
        author: 'asda',
        url: 'www',
        likes: 2
    },
    {
    title: 'b',
        author: 'sa',
        url: 'w',
        likes: 32
    }
]

  const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'meee', url: 'no', likes: 4 })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  module.exports = {
    initialNotes, nonExistingId, blogsInDb, usersInDb
  }