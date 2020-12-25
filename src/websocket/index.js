let io = require("socket.io")();

const websocket = (server) => {
  io.attach(server, {
    path: "/ws",
  });
  io.of("/api/ws/dht").on("connection", (socket) => {
    console.log(`client ${socket.id} connected`);
    socket.on("get data", () => {
      socket.emit("update data", {
        time: "unknown",
        temperature: "26.25",
        humidity: "73.23",
      });
    });
    socket.on("disconnect", () => {
      console.log(`client ${socket.id} disconnected`);
      socket.removeAllListeners();
    });
  });
};

module.exports = websocket;
