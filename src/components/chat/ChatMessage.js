import React from 'react';
import propTypes from 'prop-types';
import Message from './Message';

const ChatMessage = ({image, name, message, timestamp}) => {
    if (!name) {
        return <Message
            message={message}
        />
    }
    return (
    <div className='flex items-center space-x-3'>
    <img
        className='rounded-full h-7 border'
        src={image}
        alt='profile-image'
    />
    <div
        className='flex flex-col'
    >
        <strong
            className='text-black whitespace-nowrap'
        >{name}:</strong>
        <span
        className='text-xs'
        >{timestamp}</span>
    </div>
    <span className='text-yellow-500'>
        {message}
    </span>
    </div>
  );
};

ChatMessage.propTypes = {
    image: propTypes.string,
    name: propTypes.string,
    timestamp: propTypes.string,
    message: propTypes.string.isRequired,
}

export default ChatMessage;