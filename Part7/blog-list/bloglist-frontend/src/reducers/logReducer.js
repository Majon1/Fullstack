const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (user) => {
  return {
    type: 'LOGIN',
    data: user,
  }
}

export const logOut = () => {
  return {
    type: 'LOGOUT'
  }

}
export default loginReducer