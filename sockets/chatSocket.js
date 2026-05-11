const db = require("../db");

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // Join Room
    socket.on("join_room", async (room) => {
      socket.join(room);

      // Load old messages
      const [messages] = await db.query(
        "SELECT * FROM messages WHERE room = ? ORDER BY created_at ASC",
        [room]
      );

      socket.emit("previous_messages", messages);
    });

    // Send Message
    socket.on("send_message", async (data) => {

      const { sender, room, message } = data;

      // Save to DB
      await db.query(
        "INSERT INTO messages(sender, room, message) VALUES (?, ?, ?)",
        [sender, room, message]
      );

      // Emit to room
      io.to(room).emit("receive_message", {
        sender,
        message,
        room,
        created_at: new Date()
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

};