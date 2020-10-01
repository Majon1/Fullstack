import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'

// APP RETURN <FINDER>!!

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
        <Filter findCountry={findCountry} handleFilter={handleFilter} countries={countries}/>
      </div>
  )
}
//countriesToShow
//filter.length < 10 AND filter.length = countries.length -1


export default App