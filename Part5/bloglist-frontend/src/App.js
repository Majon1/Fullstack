import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationError from './components/NotificationError'
import './index.css'
import NotificationMessages from './components/NotificationMessages'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
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

  const addLike = (id, blogObject) => {
    const moreLikes = blogs.find(blog => blog.id === id)
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        returnedBlog.user = moreLikes.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log('An error occured', error)
        setErrorMessage('Could not like post!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setNotifications('Like added to post!')
    setTimeout(() => {
      setNotifications(null)
    }, 5000)
  }
  const removeBlog = (id) => {
    const post = blogs.find(blog => blog.id === id)
    const alert = (window.confirm(`Do you want to delete ${post.title}?`))
    if (alert === true) {
      blogService
        .remove(id)
        .then(() => {
          const del = blogs.filter(blog => id !== blog.id)
          setBlogs(del)
          setErrorMessage(`${post.title} deleted!`)
          console.log('removed blog')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    else {
      return null
    }
  }

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
    setNotifications('Logged out!')
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
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />

  )
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create new post' ref={blogFormRef} >
      <BlogForm createBlog={addBlog}
      />
    </Togglable>
  )
  const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

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
          {sortByLikes(blogs).map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} user={user} removeBlog={removeBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App