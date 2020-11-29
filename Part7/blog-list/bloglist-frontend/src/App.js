import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setMessage } from './reducers/notifyReducer'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, create, addLike, removeB } from './reducers/reducer'
import { initializeUser } from './reducers/userReducer'
import { login, logOut } from './reducers/logReducer'
import {
  Switch, Route, Link, useRouteMatch, useParams
} from 'react-router-dom'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
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
  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    const matchB = useRouteMatch('/blogs/:id')
    const blog = matchB
      ? blogs.find(blog => blog.id === (matchB.params.id))
      : null

    return (
      <div>
        <div>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/blogs'>blogs</Link>
          <Link style={padding} to='/users'>users</Link>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <div>
          <Switch>
            <Route path='/users/:id'>
              <UserId users={users} />
            </Route>
            <Route path='/users'>
              <Users users={users} />
            </Route>
            <Route path='/blogs/:id'>
              <ShowBlogId blog={blog} />
            </Route>
            <Route path='/blogs'>
              <ShowBlog blogs={blogs} />
            </Route>
            <Route path="/">
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog createBlog={createBlog} />
              </Togglable>
              <ShowBlog blogs={blogs} />
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
  const Users = ({ users }) => (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr><th></th><th>blogs created</th></tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}><td>
              <Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>

  )

  const UserId = ({ users }) => {
    const id = useParams().id
    const user = users.find(n => n.id === id)
    if (!user) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <div>added blogs:</div>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title} </li>)}
        </ul>
      </div>
    )
  }

  const ShowBlogId = ({ blog }) => {
    if (!blog) {
      return null
    }
    return (
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <div><a href='{blog.url}'>{blog.url}</a></div>
        <div>has {blog.likes} likes <button onClick={() => handleLike(blog.id)}>like</button></div>
        <div>added by {blog.user.name}</div>
        <div>
          {user.username === blog.user.username && <button onClick={() => handleRemove(blog.id)}>remove</button>}</div>
      </div>)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const ShowBlog = ({ blogs }) => (
    <div>
      <h2>Blogs</h2>
      {blogs.sort(byLikes).map(blog =>
        <div key={blog.id}>
          <div style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
          </div>
        </div>)}
    </div >
  )


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

  // const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Notification />
      <h2>BlogApp</h2>
      <Menu />
    </div>)
}
/*<div>
        {blogs.sort(byLikes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            own={user.username === blog.user.username}
          />
        )}
      </div> */
export default App