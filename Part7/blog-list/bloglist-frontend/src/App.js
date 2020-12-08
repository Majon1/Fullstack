import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import NewComment from './components/NewComment'
import { setMessage } from './reducers/notifyReducer'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, create, addLike, removeB } from './reducers/reducer'
import { initializeUser } from './reducers/userReducer'
import { login, logOut } from './reducers/logReducer'
import { Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom'
import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button, AppBar, Toolbar, TableHead } from '@material-ui/core'

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
      console.log('wrong user/pass')
      notifyWith('wrong username/password')
    }
  }

  const Menu = () => {

    const matchB = useRouteMatch('/blogs/:id')
    const blog = matchB
      ? blogs.find(blog => blog.id === (matchB.params.id))
      : null

    return (
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit"
                component={Link} to="/">home
              </Button>
              <Button color="inherit"
                component={Link} to="/blogs">blogs
              </Button>
              <Button color="inherit"
                component={Link} to="/users">users
              </Button>
              <Button color="inherit" onClick={handleLogout}>logout</Button>
            </Toolbar>
          </AppBar>
          <Notification />
          <h2>BlogApp</h2>
          {user.name} logged in
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
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <tr><th align='left'>Users:</th><th align='left'>Blogs created:</th></tr>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.id}>
                <TableCell align='left'>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align='left'>
                  {user.blogs.length}
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <tr><th align="left">Added blogs:</th></tr>
            </TableHead>
            <TableBody>
              {user.blogs.map(blog => <TableRow key={blog.id}><TableCell><Link to={`/blogs/${blog.id}`}>{blog.title} </Link></TableCell> </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>
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
        <h2>Comments</h2>
        <Togglable buttonLabel='Comment' ref={blogFormRef}>
          <NewComment createComment={comment}
            id={blog.id} />
        </Togglable>

        {blog.comments.map(comment =>
          <li key={blog.id}>
            {comment}</li>)}
      </div>
    )
  }

  const comment = async ( comment ) => {
    const id = blogs.id
    try {
      const newComment = { 'comment': comment }
      await blogService.comment(newComment, id)
      dispatch(initializeBlogs(blogs.map(blog => blog.id === id
        ? { ...blog, comments: blog.comments.concat(comment) }
        : blog
      )))
      notifyWith(`new comment ${comment} added!`)

    }
    catch (exception) {
      console.log(exception)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const ShowBlog = ({ blogs }) => (
    <div>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort(byLikes).map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  )

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(create(blog))
      dispatch(initializeBlogs())
      dispatch(initializeUser())
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const vote = blogs.find(n => n.id === id)
    const votedOn = { ...vote, likes: vote.likes + 1, user: vote.user.id }
    dispatch(addLike(votedOn))
    console.log('voted')
    notifyWith(`You voted on "${votedOn.title}"`)
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeB(blogToRemove.id))
      dispatch(initializeBlogs())
      dispatch(initializeUser())
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
          <Notification />
          <div>
            <TextField label="username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <TextField label="password" Input type='password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit" id='login'>
              login
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Menu />
      </div>
    </Container>)
}

export default App