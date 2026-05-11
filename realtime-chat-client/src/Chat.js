import React, { useEffect, useState } from "react";
import socket from "./socket";

function Chat({ username, room }) {

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {

    if(room) {
      socket.emit("join_room", room);
    }

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("previous_messages", (messages) => {
      setMessageList(messages);
    });

    return () => {
      socket.off("receive_message");
      socket.off("previous_messages");
    };

  }, [room]);

  const sendMessage = async () => {

    if(message !== "") {

      const messageData = {
        sender: username,
        room,
        message
      };

      socket.emit("send_message", messageData);

      setMessage("");
    }
  };

  return (
    <div>

      <div className="chat-window">
        {messageList.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            {msg.message}
          </div>
        ))}
      </div>

      <input
        value={message}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}

export default Chat;