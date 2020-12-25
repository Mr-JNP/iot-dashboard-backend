const mongoose = require("mongoose");

const MQTT = mongoose.model(
  "MQTT",
  new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    topic: { type: String },
    payload: { type: Number },
    qos: { type: Number },
    timestamp: { type: Number },
    datetime: { type: String },
  }),
  "mqtt"
);

module.exports = MQTT;
