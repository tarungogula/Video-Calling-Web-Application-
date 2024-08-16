import { useSocket } from "@/context/socket"
import { useRouter } from "next/router"

const { useState, useEffect, useRef } = require("react")

 const usePeer = () => {
    const [peer,setPeer] = useState(null)
    const [myId,setMyId] = useState('')

    const socket = useSocket()
    const roomId = useRouter().query.roomId;


    const isPeerSet = useRef(null)

    useEffect(()=> {
        if (isPeerSet.current || !socket || !roomId) return;

        isPeerSet.current = true;
        (async  function initPeer() {
            const myPeer= new (await import('peerjs')).default()
            setPeer(myPeer)

            myPeer.on('open',(id) => {
                console.log("Your Peer id is", id)
                setMyId(id)
                socket?.emit('join-room', roomId,id)
            })
        }
    )()
    },[socket, roomId])

    return {
        peer,
        myId
    }
}

export default usePeer;
