const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT-BLOGS':
    return action.data
  /* case 'LOGIN':
    return
      CASE 'LOGOUT:
    return
    CASE 'ADD-BLOG':
    return
    CASE 'REMOVE-BLOG':
    returnF
    CASE 'ADD-VOTE':*/
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

export default reducer