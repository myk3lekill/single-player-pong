//-----------SOCKET SOURCE CODE------------//

//Track Players
let readyPlayerCount = 0;

function listen(io) {
//Event Emitter
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('ready', () => {
            console.log('Player ready', socket.id)

            //Track Players
            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                //Broadcast ('startGame')
                io.emit('startGame', socket.id)
            }
        });
        //Track Paddle Movements and Broadcast position to opponent player
        socket.on('paddleMove', (paddleData) => {
            socket.broadcast.emit('paddleMove', paddleData)
        });
        //Track Ball Movements and Broadcast position to opponent player
        socket.on('ballMove', (ballData) => {
            socket.broadcast.emit('ballMove', ballData);
        })
        //Manage Disconnections
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`)
        })
    })
}

module.exports = {
    listen
}