import React, { useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import { BiSend } from 'react-icons/bi';

const Chat = ({ socket, messages }) => {
  const [hidden, setHidden] = useState(false);
  const [message, setMessage] = useState('');
  const scrollRect = useRef();
  console.log(messages);

  useEffect(() => {
    scrollDown();
  }, []);

  const scrollDown = () => {
    setTimeout(() => {
      scrollRect.current.scrollTop = scrollRect.current.scrollHeight;
    }, 50);
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
        console.log('new msg');
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
      console.log('Message sent:', message); // Log the message sent
      setMessage('');
      scrollDown();
    }
  };

  return (
    <div
      className='fixed bottom-10 left-10 border rounded-md max-h-[500px] max-w-[500px]
      z-10 bg-white'
    >
        <button
          className='absolute -top-8 left-1/2' 
          onClick={() => setHidden(!hidden)}
        >
          <span
            className='text-xs underline text-white'
          >{hidden ? 'Open' : 'Close'}</span>
        </button>
      <div className='flex w-full h-12 p-2 space-x-1'
        onClick={() => setHidden(false)}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='pl-2 p-1 rounded-sm w-3/4'
          placeholder='Say something nice'
          onKeyDown={onEnter}
        />
        <button
          className='p-1 rounded-full w-1/4
          transition-all hover:opacity-60 border
          flex justify-center items-center space-x-2'
          onClick={sendMessage}
          disabled={!message}
        >
          <span>
          Send
          </span>
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
