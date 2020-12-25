const express = require("express");
const cors = require("cors");
const mockdata = require("./utils/mockdata");
const websocket = require("./websocket");

const app = express();
const port = 3100;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json(mockdata);
});

const server = require("http").createServer(app);
websocket(server);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
