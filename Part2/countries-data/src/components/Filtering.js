import React from 'react'
import ShowCountry from './ShowCountry'

const Filtering = ({ countries, findCountry, handleShow }) => {

    const filtering = countries.filter(country => country.name.toLowerCase().includes(findCountry.toLowerCase()))

    if (filtering.length > 10) {
        return 'Too many matches, specify another filter'
    }
    else if (filtering.length === 1) {
        return <ShowCountry country={filtering[0]} />
    }
    else {
        return (
        filtering.map(countries => <li key={countries.name}> {countries.name} 
             <button onClick={handleShow} value={countries.name}>Show</button></li>)
        )}
}
export default Filtering