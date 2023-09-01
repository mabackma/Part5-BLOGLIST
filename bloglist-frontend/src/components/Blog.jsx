import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import TogglableBlog from './TogglableBlog'

const Blog = ({ blog, blogs, setBlogs, setErrorMessage }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = {
    display: blogVisible ? '' : 'none',
    border: blogVisible ? '2px solid black' : 'none',
    marginTop: blogVisible ? '3px' : '0',
    marginBottom: blogVisible ? '3px' : '0',
    padding: blogVisible ? '2px' : '0'
  }

  const blogRef = useRef()

  const getUsername = () => {
    const userString = window.localStorage.getItem('loggedBlogappUser')
    if(userString === null) {
      return ''
    }
    const user = JSON.parse(userString)
    return user.name
  }

  const addLike = async () => {
    const newBlogObject = {
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(newBlogObject, blog.id)

    // Map over the previous blogs and update the specific blog that matches the id
    const updatedBlogs = blogs.map(prevBlog =>
      prevBlog.id === updatedBlog.id ? updatedBlog : prevBlog)

    // update the blogs state
    setBlogs(updatedBlogs)
  }

  const removeBlog = async () => {
    const isRemoved = await blogService.removeOne(blog)

    if(isRemoved) {
      // Filter the previous blogs without the deleted blog
      const updatedBlogs = blogs.filter(prevBlog => prevBlog.id !== blog.id)
      // update the blogs state
      setBlogs(updatedBlogs)
      setErrorMessage(`Deleted blog ${blog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    else {
      setErrorMessage(`Failed to delete blog ${blog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <TogglableBlog
      buttonLabel="view"
      buttonLabelExit="hide"
      blogTitle={blog.title}
      blogAuthor={blog.author}
      ref={blogRef} >
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}&nbsp;
        <button onClick={() => addLike()}>like</button>
      </div>
      <div>{getUsername()}</div>
      <div>
        <button onClick={() => removeBlog()}>remove</button>
      </div>
    </TogglableBlog>
  )
}

export default Blog