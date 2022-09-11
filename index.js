import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { rijeci } from './rijeci/randomRijec.js';

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

// var rijec = setInterval(function () {
//     rand = rijeci[Math.floor(Math.random() * rijeci.length)];
//     return rand;
// }, 1000 * 60 * 60 * 24); 

let rijec = rijeci[Math.floor(Math.random() * rijeci.length)];
let brojac = 0;
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        brojac++;
        brojac > 1 ? io.emit("noviIgrac", { rijec }) : undefined;
    });

    socket.once("send_message", (data) => {
        io.emit("receive_message", data);
    });

    socket.on("kraj_igre", () => {
        brojac = 0;
    })
});

const PORT = process.env.PORT || '5000';
server.listen(PORT, () => {
    console.log("SERVER IS RUNNING", PORT);
});