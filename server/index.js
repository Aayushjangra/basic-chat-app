const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io") // socket.io me se muje server de doo


app.use(cors());

const server = http.createServer(app);  //socket.io ka ek method hai create server karne ka node js and socket ka connection bana rahe hoo

//ye kar rahe hai socket io ka  server ke leye
const io = new Server (server, {
    cors : {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    },
})

//jab socket connect ho uske id pata chale ga ke yee wala connect hai socket 
io.on("connection",(socket) => {
    console.log(`user connected : ${socket.id}`);

    socket.on("send-message", (message) => {
        console.log(message);        //broadcast the rceived messaage to all the connected user
        io.emit("received-message", message);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
})

server.listen(5000, () => {
    console.log("server running at port 5000")
})
