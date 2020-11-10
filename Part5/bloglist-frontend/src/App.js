import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationError from './components/NotificationError'
import './index.css'
import NotificationMessages from './components/NotificationMessages'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notifications, setNotifications] = useState(null)

 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.concat(returnedBlogs))
      })
    setNotifications(`A new blog: ${blogObject.title}, by:${blogObject.author} added!`)
    setTimeout(() => {
      setNotifications(null)
    }, 5000)
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    setNotifications(`Logged out!`)
    setTimeout(() => {
      setNotifications(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotifications(`Welcome ${user.name}!`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username and/or password! Try again!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create new post' ref={blogFormRef} >
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <NotificationError message={errorMessage} />
      <NotificationMessages message={notifications} />
      <h2>blogs</h2>

      {user === null ?
        loginForm() :
        <div>
          {user.name} logged in!
          <form onSubmit={handleLogOut}>
            <button type="submit">logout</button>
          </form>

          {blogForm()}

          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App