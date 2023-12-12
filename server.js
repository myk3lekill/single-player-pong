const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin:'*',
        methods: ['GET', 'POST']
    }
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

//Track Players
let readyPlayerCount = 0;

//Event Emitter
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('ready', () => {
        console.log('Player ready', socket.id)

        //Track Players
        readyPlayerCount++;

        if (readyPlayerCount === 2) {
            //Broadcast ('startGame')
            io.emit('startGame', socket.id)
        }
    })
})