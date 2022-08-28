import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const server = http.createServer(app);

app.use(cors());
// app.use(express.json());

// app.get('/test', (req, res) => {
//     res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
// })

const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

let rijec = 'react'
let brojac = 0;
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        console.log('user join in Room', data)
        brojac++;
        brojac > 1 ? io.emit("noviIgrac", { rijec }) : undefined;
    });

    socket.once("send_message", (data) => {
        // io.to(data.room).emit("receive_message", data);
        console.log('primio poruku na bekendu')
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
