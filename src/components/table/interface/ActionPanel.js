import React from 'react'
import PropTypes from 'prop-types'

const ActionPanel = props => {
  return (
    <div
        className='absolute bottom-3 right-10
        flex justify-between space-x-4'
    >
        <button
            className=''
            onClick={() => props.onAction('CHECK')}
        >Check</button>
        <button
            className=''
            onClick={() => props.onAction('CALL')}
        >Call</button>
        <button
            className=''
            onClick={() => props.onAction('BET', 10_000)}
        >Bet</button>
        <button
            className=''
            onClick={() => props.onAction('RAISE', 90_000)}
        >Raise</button>
        <button
            className=''
            onClick={() => props.onAction('FOLD')}
        >Fold</button>
    </div>
  )
}

ActionPanel.propTypes = {
    onAction: PropTypes.func.isRequired,
}

export default ActionPanel
