const express = require("express");
const { PORT } = require("./config.json");
const SIO = require("./sio");
const http = require("http");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  //console.log("Server running.");
  res.sendFile(__dirname + "/public/index.html");
});

const server = app.listen(PORT, () => {
  console.log("Server listen on port", PORT);
});


const io = require("socket.io")(server);

const sio = new SIO(__dirname + "/events", io, true);  