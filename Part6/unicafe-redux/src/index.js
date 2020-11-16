import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
console.log(store.getState())

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
   console.log(store.getState())
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
    console.log(store.getState())
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
    console.log(store.getState())
  }
  const resetStats = () => {
    store.dispatch({
      type: 'ZERO'
    })
    console.log(store.getState())
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={resetStats}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>)
}

  const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }

  renderApp()
  store.subscribe(renderApp)