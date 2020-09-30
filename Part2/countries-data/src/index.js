import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const App = () => {
  const[countries, SetCountry] = useState([])
  const[findCountry, setFind] = useState('start typing...')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fullfilled')
        SetCountry(response.data)
      })
  }
useEffect(hook, [])
    
console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    console.log('event', event.target.value)
    setFind(event.target.value)
    
}
  return (
    <div>
      <form>
        find countries: <input
        value={findCountry}
        onChange={handleFilter} />
        </form>
      </div>
  )
}
//countriesToShow
//filter.length < 10 AND filter.length = countries.length -1
ReactDOM.render(
<App />,document.getElementById('root')
)
