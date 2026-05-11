import React, { useState } from "react";
import Chat from "./Chat";

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinChat = () => {
    if(username && room) {
      window.location.reload(false);
    }
  };

  return (
    <div>
      <h1>Realtime Chat</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Room"
        onChange={(e) => setRoom(e.target.value)}
      />

      <Chat username={username} room={room} />
    </div>
  );
}

export default App;