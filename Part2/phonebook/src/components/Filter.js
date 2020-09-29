import React from 'react'

const Filter = (props) => {
    console.log('this filter', props);
    return (
        <div>
            filter: <input
                value={props.value}
                onChange={props.onChange} />
        </div>)
}

export default Filter
