import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import TogglableBlog from './TogglableBlog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0
  }

  const mockHandler = jest.fn()
  render(<Blog blog={blog} toggleVisibility={mockHandler}/>)

  const titleAuthorElement = screen.queryAllByText('test title test author')
  screen.debug()
  expect(titleAuthorElement).toBeDefined()
})