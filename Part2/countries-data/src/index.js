import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const[countries, SetCountry] = useState([
    { name: 'Finland', id: 2 },
  ])
 // const[findCountry, setFind] = useState([])

  const handleFind = (event) => {
    SetCountry(event.target.value)
   // console.log('handlefind gets', event)
   /* SetCountry(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  //data.filter(x => x.title.toLowerCase().includes(term.toLowerCase()))*/
  }

  return (
    <div>
      <form>
        find countries: <input
        value={countries}
        onChange={handleFind} />
        </form>
        
      </div>
  )
}


ReactDOM.render(
<App />,document.getElementById('root')
)
