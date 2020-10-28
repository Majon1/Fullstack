const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialNotes) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialNotes.length), ('Content-Type', /application\/json/)
  })

  test('unique value added', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toBeDefined()
  })

describe('addition of a new blog', () => {
  test('adds new post', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'it is me',
      url: 'www',
      likes: 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.blogsInDb()
    expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.title)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })
  test('blog without title or author is not added', async () => {
    const newBlog = {
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialNotes.length)
  })

  test('likes exists', async () => {
    const likesZero = {
      title: String,
      author: String,
      url: String,
      likes: null
    }
    await api
    .post('/api/blogs')
    .send(likesZero)
    .expect(400)
  
   expect(likesZero.likes).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})