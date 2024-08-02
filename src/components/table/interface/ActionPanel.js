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
            onClick={props.onCheck}
        >Check</button>
        <button
            className=''
            onClick={props.onBet}
        >Bet</button>
        <button
            className=''
            onClick={props.onRaise}
        >Raise</button>
        <button
            className=''
            onClick={props.onFold}
        >Fold</button>
    </div>
  )
}

ActionPanel.propTypes = {
    onCheck: PropTypes.func.isRequired,
    onBet: PropTypes.func.isRequired,
    onRaise: PropTypes.func.isRequired,
    onFold: PropTypes.func.isRequired,
}

export default ActionPanel
