import { useSocket } from "@/context/socket";
import { usePeer } from "@/hooks/usePeer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {v4 as uuidv4} from "uuid"



export default function Home() {

  const router = useRouter();
  const [roomId,setRoomId] = useState('')

  const createAndJoin =() => {
    const roomId = uuidv4()
    router.push('/'+roomId)
  }

  const JoinRoom=()=> {
    if (roomId == null) window.alert("Please enter room id")
    else router.push('/'+roomId);

  }
  return (
    <div className="h-screen flex flex-col items-center gap-4 justify-center border-2 ">

      <h1 className="text-lg"> Meet </h1>

      <div className="flex gap-2 ">
        <input type="text" placeholder="Enter Room Id" value={roomId} onChange={(e)=> setRoomId(e.target.value) }/>
        <button className="bg-blue-400 p-2 rounded-lg" onClick={JoinRoom}> Join Room </button>
      </div>

      <div>
        <button  className="bg-orange-400 p-2 rounded-lg" onClick={createAndJoin}> create Room </button>
      </div>

    </div>
  );
}


  // const socket = useSocket()
  
  // usePeer()

  // useEffect(()=> {
  //   console.log("index run")
  //   socket?.on("connect", () => {
  //     console.log("in index",socket.id)
  //   });
  // },[socket])
