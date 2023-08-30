const SignedInUser = ({ name, handleLogout }) => {
  return (
    <div>
      {name} logged in <button onClick={handleLogout}>Logout</button>
      <br /><br />
    </div>
  )
}

export default SignedInUser