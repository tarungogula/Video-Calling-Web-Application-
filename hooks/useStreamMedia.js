
import React, { useEffect, useRef, useState } from 'react'

const useStreamMedia=()=> {
    const [state,setState] = useState(null)
    const isStreamSet = useRef(false)

    useEffect(()=> {

        if (isStreamSet.current) return;
        isStreamSet.current = true;
        (async function(){
            try{
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:true,
            })
            console.log('Setting your Stream Started')
            setState(stream)
            }
            catch(e) {
                console.log("Error in Stream Setting", e)
            }
        })()
    },[])

    return {stream: state}
}

export default useStreamMedia;