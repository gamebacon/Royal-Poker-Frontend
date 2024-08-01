import React from 'react';
import propTypes from 'prop-types';

const Message = ({message}) => {
    return (
    <div className='flex items-center space-x-3'>
    <span className='text-yellow-500'>
        {message}
    </span>
    </div>
  );
};

Message.propTypes = {
    message: propTypes.string.isRequired,
}

export default Message;