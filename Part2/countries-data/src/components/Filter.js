import React from 'react'



const Filter = ( { findCountry, handleFilter } ) => {
    return (
        <form>
        find countries: <input
        value={findCountry}
        onChange={handleFilter} />
        </form>
    )
}

export default Filter