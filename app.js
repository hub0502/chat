const express = require("express")
const http = require("http")
const app = express()
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")
const date = new Date();

const io = socketIO(server);

app.use(express.static(path.join(__dirname,"src")))
const PORT = process.env.PORT || 5000;

io.on("connection", (socket)=>{
  socket.on("chatting", (data)=>{
    const {name, msg} = data;
    io.emit("chatting", {
      name,
      msg,
      time : date.getHours().toString() + ":" + date.getMinutes().toString()
    });
  })
})

server.listen(PORT, ()=>console.log(`server is running  ${PORT}`))