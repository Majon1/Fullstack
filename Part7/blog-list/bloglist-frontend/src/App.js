import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setMessage } from './reducers/notifyReducer'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, create, addLike, removeB } from './reducers/reducer'
import { login, logOut } from './reducers/logReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(login(user))
  }, [dispatch])

  const notifyWith = (message, type = 'success') => {
    const mess = { message, type }
    dispatch(setMessage(mess, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      setUsername('')
      setPassword('')
      dispatch(login(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    }
    catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }


  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(create(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const vote = blogs.find(n => n.id === id)
    const votedOn = { ...vote, likes: vote.likes + 1, user: vote.user.id }
    dispatch(addLike(votedOn))
    //dispatch(setMessage(`You voted on "${vote}"`, 5))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeB(blogToRemove.id))
      notifyWith(`${blogToRemove.title} removed!`)
    }
  }

  const handleLogout = () => {
    dispatch(logOut())
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      )}
    </div>)
}

export default App