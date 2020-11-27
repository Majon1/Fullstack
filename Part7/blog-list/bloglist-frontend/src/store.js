import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notifyReducer from './reducers/notifyReducer'
import blogReducer from './reducers/reducer'
import loginReducer from './reducers/logReducer'

const reducer = combineReducers({
  notification: notifyReducer,
  blogs: blogReducer,
  user: loginReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store