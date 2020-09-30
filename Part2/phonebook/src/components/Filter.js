import React from 'react'

const Filter = ({shown, handleFind}) => {
    return (
        <div>
            filter: <input
                value={shown}
                onChange={handleFind} />
        </div>)
}

export default Filter
