import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import { BiSend } from 'react-icons/bi';

const Chat = ({ socket, messages }) => {
  const [hidden, setHidden] = useState(true);
  const [message, setMessage] = useState('');
  const scrollRect = useRef();

  useEffect(() => {
    scrollDown();
  }, []);

  const scrollDown = () => {
    setTimeout(() => {
      scrollRect.current.scrollTop = scrollRect.current.scrollHeight;
    }, 10);
  }

    const onEnter = (event) => {
        if (event.key === 'Enter') {
          sendMessage();
        }
    };

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => {
        setMessage((prev) => [...prev, msg]);
        scrollDown();
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', message);
      console.info('Message sent:', message); // Log the message sent
      setMessage('');
      scrollDown();
    }
  };

  return (
    <div
      className='fixed bottom-16 left-14 rounded-md max-h-[500px] max-w-[500px]
      z-10 bg-white'
    >
        <button
          className='absolute -top-8 left-1/2' 
          onClick={() => setHidden(!hidden)}
        >
          {!hidden && <span
            className='text-xs underline text-white'
          >Close</span>}
        </button>
      <div className={`flex w-full h-12 p-2 space-x-1 ${hidden ? '' : 'border-b border-black'}`}
        onClick={() => setHidden(false)}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='pl-2 p-1 rounded-sm w-3/4 outline-none'
          placeholder='Say something nice'
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
  );
};

Chat.propTypes = {
  socket: propTypes.any.isRequired,
  messages: propTypes.array.isRequired,
};

export default Chat;
