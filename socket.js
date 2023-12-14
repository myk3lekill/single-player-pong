//-----------SOCKET SOURCE CODE------------//

//Track Players
let readyPlayerCount = 0;

function listen(io) {
    //Namespace
    const pongNamespace = io.of('/pong');
    //Event Emitter
    pongNamespace.on('connection', (socket) => {
        console.log('A user connected', socket.id);
        //Set Room variable scope
        let room;

        socket.on('ready', () => {
            //Join Rooms with two players
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room)

            console.log('Player ready', socket.id, room)

            //Track Players
            readyPlayerCount++;

            if (readyPlayerCount % 2 === 0) {
                //Broadcast ('startGame') sending to all client in game room including sender
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        });
        //Track Paddle Movements and Broadcast position to opponent player
        socket.on('paddleMove', (paddleData) => {
            socket.to(room).emit('paddleMove', paddleData)
        });
        //Track Ball Movements and Broadcast position to opponent player
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMove', ballData);
        })
        //Manage Disconnections
        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`)
            //Leave Rooms
            socket.leave(room)
        })
    })
}

module.exports = {
    listen
}