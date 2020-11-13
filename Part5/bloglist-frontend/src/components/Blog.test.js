import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('show blogscontent', () => {
  let component
  

  const blog = {
    title: 'blog',
    author: 'blogger',
    url: 'www',
    user: {
      username: 'who',
      name: 'mee',
      id: 'User id'
    },
    likes: 2
  }

  test('shows title and author', () => {

    component = render(
      <div>
        <Blog blog={blog}>
          <div className='first'>
            title, author
          </div>
        </Blog>
      </div>)
    // component.debug()

    expect(component.container).toHaveTextContent(
      'blog', 'blogger')
  })
  test('when button is pressed', () => {

    component = render(
      <div>
        <Blog blog={blog}>
          <div className='toggleView'>
            title, author, url, user, likes
          </div>
        </Blog >
      </div >)
    //component.debug()

    expect(component.container).toHaveTextContent(
      'blog', 'blogger', 'www', 'mee', 2)
  })

  test('clicking twice', async () => {
    const blog = {
      title: 'blog',
      author: 'blogger',
      url: 'www',
      user: {
        username: 'who',
        name: 'mee',
        id: 'User id'
      },
      likes: 2
    }
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} addLike={mockHandler} />
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})