import React from 'react'

const size = {
   width: '155px'
}

const ShowCountry = ({ country }) => {
   return (
      <div>
   <h2>{country.name}</h2>
   <p>capital: {country.capital}</p>
   <p>population: {country.population}</p>
   <h3>Languages</h3>
   {country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}
   <br></br>
   <br></br>
   <img src={country.flag} style={size} alt='Flag of country' />
</div>)
}

export default ShowCountry