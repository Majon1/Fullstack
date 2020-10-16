const info = (...params) => { //prints normal logs
    console.log(...params)
  }
  
  const error = (...params) => { //print errors
    console.error(...params)
  }
  
  module.exports = {
    info, error
  } 