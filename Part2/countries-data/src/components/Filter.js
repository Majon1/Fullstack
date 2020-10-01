import React from 'react'

/*const Find = () => {
    if (.length > 10) {
        return (
        <p>Too many matches, specify another filter</p>
        )}
    }*/
const Filter = ({ findCountry, countries, handleFilter }) => {
    return (
        <div>
            <form>
                find countries: <input
                    value={findCountry}
                    onChange={handleFilter} />
            </form>
            <ul>
                {countries.filter(country => country.name.toLowerCase().includes(findCountry.toLowerCase()))
                .map(country =>       
                <li key={country.name}> {country.name} </li>)}
            </ul>
        </div>
    )}
    
 
//<Find findCountry={findCountry}/>
//{findCountry.map(country =>
//<li key={country.name}></li>)}


export default Filter