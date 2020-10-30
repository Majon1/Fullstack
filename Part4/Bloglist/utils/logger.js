const info = (...params) => { //prints normal logs
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => { //print errors
  console.error(...params)
}

module.exports = {
  info, error
}