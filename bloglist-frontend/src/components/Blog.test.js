import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const user = {
    id: 'test user id',
    name: 'test user name',
    username: 'test user username'
  }

  const blog = {
    id: 'test id',
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0,
    user: user
  }

  render(
    <Blog
      blog={blog}
      blogs={[]} // Pass an empty array
      setBlogs={() => {}} // Pass an empty function
      setErrorMessage={() => {}} // Pass an empty function
    />
  )

  // There should be two instances of 'test title test author' because of the view/hide button
  const elements = screen.queryAllByText('test title test author')
  expect(elements.length).toBe(2)

  // And the details contain only one instance of 'test url' and 'likes 0'
  const urlElement = screen.queryAllByText('test url')
  expect(urlElement.length).toBe(1)
  const likeElement = screen.queryAllByText('likes 0')
  expect(likeElement.length).toBe(1)
})