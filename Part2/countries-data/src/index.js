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

  const handleFind = (event) => {
    setFind(event.target.value)
    
}
  return (
    <div>
      <form>
        find countries: <input
        value={findCountry}
        onChange={handleFind} />
        </form>
        <div>
        {countries.filter(a => a.name.toLowerCase().includes(findCountry.toLowerCase())).map(a => <div key={a.name}> </div>)}
      </div>
      </div>
  )
}


ReactDOM.render(
<App />,document.getElementById('root')
)
