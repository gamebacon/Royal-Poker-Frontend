import React from 'react'
import PropTypes from 'prop-types'
import { FaSignOutAlt } from 'react-icons/fa'

const LogoutButton = props => {
  return (
      <button
        className='hover:underline fixed right-4 top-4 md:top-2 md:right-10
        flex items-center justify-between space-x-2 text-black'
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
