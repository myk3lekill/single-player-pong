const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
    cors: {
        origin:'*',
        methods: ['GET', 'POST']
    }
});

const sockets = require('./socket');

const PORT = 3000;

httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

//Call the socket listen function from socket.js
sockets.listen(socketServer);



