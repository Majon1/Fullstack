import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Filtering from './components/Filtering'

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
    setFind(event.target.value)}

    const handleShow = (event) => {
      console.log('Buttonevent', event.target.value)
      setFind(event.target.value)
    }

  return (
    <div>
        <Filter findCountry={findCountry} handleFilter={handleFilter} countries={countries}/>
        <Filtering countries={countries} handleShow={handleShow} findCountry={findCountry} /> 
      </div>
  )
}

export default App