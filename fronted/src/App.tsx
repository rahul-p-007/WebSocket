// import React from 'react'

import { useEffect, useRef, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>();
  // const [inputData, setInputData] = useState("");
  const [message, setMessage] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    // e.preventDefault();
    // console.log(inputData);
    if (inputRef.current) {
      const message = inputRef.current.value;
      if (!socket) {
        return;
      }

      // @ts-ignore
      socket.send(message);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);
    ws.onmessage = (e) => {
      // alert(e.data);
      setMessage((prevmessage) => [...prevmessage, e.data]);
    };
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="hiii"
        // value={inputData}
        // onChange={(e) => setInputData(e.target.value)}

        ref={inputRef}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h1>Messagess : </h1>

        {message.map((mess, index) => (
          <p key={index}>{mess}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
