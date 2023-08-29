import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm = ({ blogs, setBlogs, errorMessage, setErrorMessage }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    // A new blog. The backend handles the likes and user properties.
    const newBlogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {   
      blogService.create(newBlogObject)
      console.log('created blog', blogTitle)
    } catch (exception) {
      setErrorMessage('failed creating blog: ', exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
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
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default CreateForm