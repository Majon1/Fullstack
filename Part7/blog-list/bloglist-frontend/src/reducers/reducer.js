import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'ADD_VOTE': {
    const id = action.data.id
    const likesToAdd = state.find(n => n.id === id)
    const changedLike = { ...likesToAdd, likes: likesToAdd.likes + 1 }
    return state.map(blog =>
      blog.id !== id ? blog : changedLike)
  }
  case 'REMOVE_BLOG': {
    const id = action.data
    return state.filter(blog => blog.id !== id)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeB = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

export const create = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data
    })
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    const data = await blogService.update(blog)
    dispatch({
      type: 'ADD_VOTE',
      data
    })
  }
}

export default reducer