const express = require('express');
const app = express();
const cors = require('cors');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { createServer } = require('node:http');

const server = createServer(app);

app.use(cors());
const io = new Server(server, {
	cors: {
		origin: 'http://127.0.0.1:5500',
	},
});

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit(`send_message`, ` ${msg} send by ${socket.id}`);
	});
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
