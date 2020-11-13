import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


describe('show blogscontent', () => {
  const blog = {
    title: 'blog',
    author: 'blogger',
    url: 'www',
    user: 'mee',
    likes: 2
  }
  test('shows title and author', () => {

    const component = render(
      <div>
        <Blog blog={blog}>
          <div className='first'>
            title, author
          </div>
        </Blog>
      </div>)
    component.debug()

    expect(component.container).toHaveTextContent(
      'blog', 'blogger')
  })
  test('when button is pressed', () => {

    const component = render(
      <div>
        <Blog blog={blog}>
          <div className='toggleView'>
            title, author, url, user, likes
          </div>
        </Blog >
      </div >)
    component.debug()

    expect(component.container).toHaveTextContent(
      'blog', 'blogger', 'www', 'mee', 2)
  })
})

