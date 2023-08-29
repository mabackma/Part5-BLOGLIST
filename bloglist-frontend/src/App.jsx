import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import SignedInUser from './components/SignedInUser'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(initialBlogs =>
      setBlogs( initialBlogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user) 
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log('logging in with', user.name, password)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log('logged out', user.name)
      setUser(null)   //The user state is now null because there is no user logged in
      blogService.setToken(null)
    } catch (exception) {
      setErrorMessage('Logout failed: ', exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const LoginForm = () => (
    <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )

  const BlogForm = () => (
    <div>
      <h2>blogs</h2>
      <SignedInUser name={user.name} handleLogout={handleLogout}/>
      <CreateForm errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      {user === null ?
        LoginForm() :
        BlogForm()
      }
    </div>
  )
}

export default App