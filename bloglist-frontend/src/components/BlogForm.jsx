import { useState } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
import lodash from 'lodash'

const BlogForm = ({ blogs, setBlogs, setErrorMessage }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [createVisible, setCreateVisible] = useState(false)
  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

  const createBlog = async (event) => {
    event.preventDefault()

    // A new blog. The backend handles the 'likes' and 'user' properties.
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {   
      const createdBlog = await blogService.create(newBlogObject)
      console.log('created blog', blogTitle)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setErrorMessage(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogs(blogs.concat(createdBlog))   // Update blogs state
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(`Failed creating blog: ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  // Sort the blogs array by likes in descending order
  const sortedBlogs = lodash.orderBy(blogs, ['likes'], ['desc'])

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create new blog</button>
      </div>

      <div style={showWhenVisible}>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
            <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div> 
      </form>
      <div>
        <button onClick={() => setCreateVisible(false)}>cancel</button> 
      </div>
      </div>

      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default BlogForm