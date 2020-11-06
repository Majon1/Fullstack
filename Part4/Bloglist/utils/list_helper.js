const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (arrays) => {
  const reducer = (sum, array) => {
    return sum + array.likes
  }
  return arrays.reduce(reducer, 0)
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

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, blog => blog.author)
  const authors = []
  _.forEach(groupedByAuthor, (authorBlogs, author) => {
    authors.push({
      author: author,
      blogs: authorBlogs.length
    })
  })

  const sortedAuthorList = _.sortBy(authors, author => author.blogs)
  return sortedAuthorList.pop()
}

const mostLikedAuthor = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, blog => blog.author)
  const authors = []
  _.forEach(groupedByAuthor, (authorBlogs, author) => {
    authors.push({
      author: author,
      likes: totalLikes(authorBlogs)
    })
  })

  const sortedAuthorList = _.sortBy(authors, author => author.likes)
  return sortedAuthorList.pop()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedAuthor
}