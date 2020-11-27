import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notifyReducer from './reducers/notifyReducer'
import blogService from './services/blogs'
import blogReducer, { initializeBlogs } from './reducers/reducer'


const reducer = combineReducers({
  notification: notifyReducer,
  blogs: blogReducer
})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
blogService.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)

export default store