import React from 'react'
import PropTypes from 'prop-types'
import { FaSignOutAlt } from 'react-icons/fa'

const LogoutButton = props => {
  return (
      <button
        className='hover:underline fixed top-10 right-10 
        flex items-center justify-between space-x-2 text-white'
        onClick={props.onClick}
      >
        <span>
        Sign out
        </span>
        <FaSignOutAlt/>
      </button>
  )
}

LogoutButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default LogoutButton
