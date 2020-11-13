import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'



test('shows title and author', () => {
  const blog = {
    title: 'blog',
    author: 'blogger'
  }

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
  const blog2 = {
    title: 'blog',
    author: 'blogger',
    url: 'www',
    likes: 2
  }

  const component = render(
    <div>
      <Blog blog={blog2}>
        <div className='toggleView'>
          title, author, url, likes
        </div>
      </Blog >
    </div >)
  component.debug()

  expect(component.container).toHaveTextContent(
    'blog', 'blogger', 'www', 'mee', 2)
})

