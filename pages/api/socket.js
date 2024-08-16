import {Server} from "socket.io"

const SocketHandler =(req,res) => {

    console.log("called API")

    if (res.socket.server.io) {
        console.log("Socket already running")
    } else {
        
        const io  = new Server(res.socket.server, {
            path:'/api/socket'
        })
        res.socket.server.io = io;
        
        io.on("connection", (socket) => {
            console.log("Server is Connected", socket.id)
            
            //joined new one lettin every one know
            socket.on('join-room', (roomId,userId)=> {
                console.log(`${userId} a new user joined in room ${roomId}`)
                 
                socket.join(roomId)
                socket.to(roomId).emit('user-connected',userId) //sending this to handleUserConnectedfunc
                //sending to all except its own
                //no need of broadcast

                
            })
        })
    }
    res.end();


}

export default SocketHandler;