const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (array) => {
  if (array.length === 0) {
    return array.length === 0
      ? 0
      : array.reduce(reducer, 0) / array.length
  }
  if (array.length === 1) {
    return array[0].likes
  }
  if (array.length > 1) {
    let sum = 0
    for (let i = 0; i < array.length; i++) {
      sum += array[i].likes
    }
    return sum
  }
}

const favoriteBlog = (array) => {
  let a = 0
  let t = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i].likes > a) {
      a = array[i].likes
      t = i
    }
  }
  console.log(array[t].title)
  console.log(array[t].author)
  console.log(array[t].likes)
  return array[t].likes
}

const mostBlogs = (array) => {
  const most = _(array)
    .countBy('author')
    .entries('title')
    .maxBy(_.last)
  console.log(most[0], most[1])
  return (most[1])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}