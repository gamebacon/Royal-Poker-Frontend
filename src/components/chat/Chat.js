import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import { BiNotification, BiSend } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import { FaExclamation } from 'react-icons/fa';

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [hidden, setHidden] = useState(true);
  const scrollRect = useRef();
  const chatRef = useRef();

  useEffect(() => {
    scrollDown();
    const handleClickOutside = (event) => {
      if (!chatRef.current?.contains(event.target)) {
        setHidden(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollDown = () => {
    setTimeout(() => {
      scrollRect.current.scrollTop = scrollRect.current.scrollHeight;
    }, 100);
  }

  const onEnter = (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
  };

  useEffect(() => {
    if (hidden) {
      setIsNewMessage(true);
    } else {
      scrollDown();
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      const handleChatUpdate = (newMessages) => {
        setMessages(newMessages);
      }
      socket.on('chatUpdate', handleChatUpdate);
      return () => {
        socket.off('chatUpdate');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', message);
      console.info('Message sent:', message); // Log the message sent
      setMessage('');
    }
  };

  const onOpen = () => {
    setHidden(false);
    setIsNewMessage(false);
    scrollDown();
  }

  return (
    <div
      className='fixed top-4 md:top-auto md:bottom-16 left-4 md:left-14 z-10'
    >
        <button
          className='absolute -bottom-8 md:bottom-auto md:-top-8 left-1/2 transform -translate-x-1/2'
          onClick={() => setHidden(false)}
        >
          {!hidden && <span
            className='text-xs underline text-white'
          >Close</span>}
        </button>
        {false && isNewMessage && <FaExclamation
          className='absolute -top-1 -right-1 text-yellow-500 text-sm'
        />}
    <div
      ref={chatRef}
      className={`rounded-md max-h-[500px] max-w-[300px] md:max-w-[500px] bg-white overflow-hidden`}
    >
      <div className={`flex w-full h-12 p-2 space-x-1 ${hidden ? '' : 'border-b border-black'}`}
        onClick={onOpen}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='pl-2 p-1 rounded-sm w-3/4 outline-none'
          placeholder='Say something'
          onKeyDown={onEnter}
        />
        <button
          className='p-1 w-1/4
          transition-all hover:opacity-60 bg-black text-white
          flex justify-center items-center space-x-2'
          onClick={sendMessage}
          disabled={!message}
        >
          <BiSend
            size={16}
          />
        </button>
      </div>
      <div
        className={`${hidden ? 'h-0 overflow-hidden' : 'h-[300px] overflow-y-scroll p-4'}
        transition-height duration-300 bg-white`}
        ref={scrollRect}
      >
        <ol
            className='text-sm'
        >
          {messages.map((msg, index) => (
            <li 
            className='even:bg-gray-100'
            key={index}>
                 <ChatMessage
                    image={msg.user?.image}
                    name={msg.user?.displayName}
                    timestamp={msg.timestamp}
                    message={msg.text}
                />
            </li>
          ))}
        </ol>
      </div>
    </div>
    </div>
  );
};

Chat.propTypes = {
  socket: propTypes.any.isRequired,
};

export default Chat;
