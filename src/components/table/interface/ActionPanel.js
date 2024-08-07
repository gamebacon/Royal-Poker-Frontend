import React from 'react'
import PropTypes from 'prop-types'
import ActionButton from './ActionButton'

const ActionPanel = props => {
  return (
    <div
        className='absolute bottom-14 right-14
        flex justify-between space-x-4'
    >
        <ActionButton
            label='Check'
            onClick={() => props.onAction('CHECK')}
        />
        <ActionButton
            label='Call'
            onClick={() => props.onAction('CALL')}
        />
        <ActionButton
            label='Bet'
            onClick={() => props.onAction('BET', 10_000)}
        />
        <ActionButton
            label='Raise'
            onClick={() => props.onAction('RAISE', 40_000)}
        />
        <ActionButton
            label='Fold'
            onClick={() => props.onAction('FOLD')}
        />
    </div>
  )
}

ActionPanel.propTypes = {
    onAction: PropTypes.func.isRequired,
}

export default ActionPanel
