import React from 'react'


const Filter = ( { findCountry, countries, handleFilter } ) => {
    return (
        <div>
        <form>
        find countries: <input
        value={findCountry}
        onChange={handleFilter} />
        </form>
        <ul>
        {countries.filter(a => a.name.toLowerCase().includes(findCountry.toLowerCase())).map(a => <div key={a.name}> {a.name}</div>)}
        </ul>
        </div>
    )
}

export default Filter

//{findCountry.map(country =>
//<li key={country.name}></li>)}