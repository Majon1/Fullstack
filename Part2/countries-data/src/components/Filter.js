import React from 'react'

const Filter = ({ findCountry,  handleFilter }) => {
    return (
        <div>
            <form>
                find countries: <input
                    value={findCountry}
                    onChange={handleFilter} />
            </form>
        </div>
    )}
    

export default Filter