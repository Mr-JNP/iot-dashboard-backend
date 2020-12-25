const express = require("express");
const mockdata = require("./utils/mockdata");

const app = express();
const port = 3100;

app.get("/", (req, res) => {
  res.status(200).json(mockdata);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
