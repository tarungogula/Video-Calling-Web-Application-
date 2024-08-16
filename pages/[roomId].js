import Player from "@/components/Player";
import { useSocket } from "@/context/socket"
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import useStreamMedia from "@/hooks/useStreamMedia";
import { useEffect } from "react";


const Room=() => {
    const socket = useSocket()
    const {peer,myId} = usePeer() ;

    const {stream} = useStreamMedia();

    const {players,setPlayers} = usePlayer()


    useEffect(()=>{

        if (!socket || !stream || !peer ) return;
        // console.log(peer)
        const handleUserConnected=(newUser) =>{
            console.log("new user connected in our room with", newUser)

            // handshake - sending my stream to new user

            const call = peer.call(newUser,stream)
            // console.log("calling new user")
            call.on('stream', (incomingStream) => {
                console.log("Incoming stream from",newUser)
                
                // storing stream from new user

                setPlayers((prev) => ({
                    ...prev,
                    [newUser] : {
                        url:incomingStream,
                        muted : false,
                        playing:true,
                    }
                }))
            })
            call.on('error',(err) => {
                console.log('error', err)
            })
        }

        socket.on('user-connected',handleUserConnected)

        return() => {
            socket.off('user-connected',handleUserConnected)
        }
    },[socket,stream,peer,setPlayers])

    //handshake - new user accepting stream and answerin

    useEffect(()=>{
        if (!peer || !stream) return;

        peer.on('call',(call) => {
            const {peer: callerId} = call;
            // console.log(`Received call from ${callerId}`);
            call.answer(stream)

            call.on('stream',(incomingStream)=>{
                console.log("Incoming stream from", callerId)

                setPlayers((prev) => ({
                    ...prev,
                    [callerId] : {
                        url:stream,
                        muted : false,
                        playing:true,
                    }
                }))
            })
        })
    },[peer,stream,setPlayers])


    //collecting all streams and displaying them

    useEffect(()=> {
        if (!stream || !myId) return;

        console.log("adding my stream to list")
        setPlayers((prev) => ({
            ...prev,
            [myId] : {
                url:stream,
                muted : false,
                playing:true,
            }
        }))

    },[stream, myId, setPlayers])

    return (
        <div className="flex border-2  border-green-400">
            {/* <div >
                {Object.keys(players).filter((playerId) => playerId === myId).map((playerId) => {
                     const {url,muted, playing} = players[playerId]

                     return 
                })}
            </div>
             */}
            {Object.keys(players).map((playerId) => {
                const {url,muted, playing} = players[playerId]

                return ( playerId === myId ?

                    <div className="flex-1 w-90 border-black border-2" >
                        <Player key={playerId} muted={muted} playing={playing} url={stream} />

                    </div>

                    :

                    <div className="flex-1 w-14" >
                        <Player key={playerId} muted={muted} playing={playing} url={stream} />

                    </div>
                    )
            })}
            
        </div>
    )

}

export default Room;