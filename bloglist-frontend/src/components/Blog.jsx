import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

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
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}&nbsp;
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}&nbsp;
          <button onClick={() => setBlogVisible(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}&nbsp;
          <button onClick={() => addLike()}>like</button>
        </div>
        <div>{getUsername()}</div>
        <button onClick={() => removeBlog()}>remove</button>
      </div>
    </div>
  )
}

// I defined the proptypes according to the blog object in the backend
const userPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
})

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: userPropTypes.isRequired,
  }).isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default Blog