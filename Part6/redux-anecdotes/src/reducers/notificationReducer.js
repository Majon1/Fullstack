const initialState = ''

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  switch (action.type) {
    case 'SET_MESSAGE':
      let newState = { ...state}
      newState = action.notification
      return newState
    case 'CLEAR_MESSAGE':
       return ''

    default:
      return state
  }
}
export const setMessage = (notification) => ({
    type: 'SET_MESSAGE',
    notification
  
})

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE',
})

export default notificationReducer