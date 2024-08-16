import { createContext, useContext, useEffect, useState } from "react"
import {io } from "socket.io-client"

const SocketContext = createContext(null)

//instead of defining in where we use in app, we are defining here and we can call it (just to decrease redundancy)
export const useSocket =() => {
    const gotSocket = useContext(SocketContext)
    return gotSocket;
}

export function SocketProvider(props) {

    const {children} = props;

    const [socket,setSocket]  = useState(null)

    useEffect(() => {
      const connection = io({path:'/api/socket'});
        setSocket(connection)
        console.log(connection)
    }, [])

    socket?.on("connect_error", async (err) => {
        console.log("Errror Establishing", err)
        await fetch('/api/socket')
    })
    
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}
