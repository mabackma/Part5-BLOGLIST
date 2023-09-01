import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

const TogglableBlog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    border: visible ? '2px solid black' : 'none',
    marginTop: visible ? '3px' : '0',
    marginBottom: visible ? '3px' : '0',
    padding: visible ? '2px' : '0'
  }
  const showWhenVisibleButton = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div>
        {props.blogTitle} {props.blogAuthor}&nbsp;
        <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
        <button style={showWhenVisibleButton} onClick={toggleVisibility}>{props.buttonLabelExit}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
})

TogglableBlog.displayName = 'TogglableBlog'

TogglableBlog.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLabelExit: PropTypes.string.isRequired,
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.string.isRequired
}

export default TogglableBlog