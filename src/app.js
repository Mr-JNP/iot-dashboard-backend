const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

const mockdata = require("./utils/mockdata");
const MQTT = require("./model");

const app = express();

mongoose
  .connect("mongodb://192.168.137.40:27017/test", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err, "Unable to connect to MongoDB"));

const port = 3100;

app.use(cors());
app.get("/", (_req, res) => {
  res.status(200).json(mockdata);
});

const server = require("http").createServer(app);
const io = socket(server);

io.on("connection", () => {
  console.info(`client ${socket.id} connected`);
});

setInterval(async () => {
  const [temperature, humidity] = await MQTT.find()
    .sort({ timestamp: -1 })
    .limit(2);

  const dht = {
    time: temperature.datetime,
    temperature: temperature.payload,
    humidity: humidity.payload,
  };

  const topic = "dht";
  console.info(`DHT : ${JSON.stringify(dht)}`);
  io.emit(topic, dht);
}, 10000);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
