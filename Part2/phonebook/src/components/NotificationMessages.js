import React from 'react'

const NotificationMessages = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="note">
        {message}
      </div>
    )
  }

  export default NotificationMessages