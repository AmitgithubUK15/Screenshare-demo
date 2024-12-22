import { useContext,createContext, useMemo, useState, useEffect } from "react";
import {io} from 'socket.io-client'

const SocketProvide = createContext(null);

export const useSocket = ()=>{
    const socket = useContext(SocketProvide);
    return socket;
}


export default function ScoketProvider({children}){
//  const socket = useMemo(() => io("http://localhost:4040"), []);
const [socket,setsocket] = useState();

useEffect(()=>{
    const websocket = io("https://screenshare-demo-five.vercel.app/");

    // websocket.on("msg",(msg)=>{
    //     console.log(msg);
    // })

    setsocket(websocket);

    return ()=>{
        if(websocket){
            websocket.disconnect();
            setsocket(null);
        }
    }

},[])

 return (           
   <SocketProvide.Provider value={socket}>
    {children}
   </SocketProvide.Provider>
 )
}