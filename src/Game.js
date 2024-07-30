import { useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

const Game = () => {
    const socket = useSocket();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    console.log(socket);

    useEffect(() => {
      if (socket) {
        socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
      }
    }, [socket]);
  
    const sendMessage = () => {
      if (socket) {
        console.log('send!');
        socket.emit('message', message);
        setMessage('');
      } else {
        console.log('not send!');
      }
    };
  
    return (
      <div>
        <h1>Game</h1>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>user: {msg}</div>
          ))}
        </div>
      </div>
    );
  };

  export default Game;
