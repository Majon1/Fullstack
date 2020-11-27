const initialState = null
let timeOut = 0

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.notification
  case 'CLEAR_MESSAGE':
    return ''
  default:
    return state
  }
}
export const setMessage = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      notification
    })
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}
export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE',
})


export default notifyReducer