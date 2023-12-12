const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

//Event Emitter
io.on('connection', (socket) => {
    console.log('A user connected')
})