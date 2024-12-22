import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';

export default function Home() {
  const [email,setEmail] = useState("");
   const [room,setRoom] = useState("");
   const navigate = useNavigate();
   const socket = useSocket();
  
   const HandleJoinRoom = useCallback(()=>{
    socket.emit("joinroom",{email,room});
    // socket.on("message",(msg)=>{
    //   console.log(msg);
    // })
    navigate(`/room/${room}`)
   },[email,room])
  

   return (
     <>
       <div>
         <h1>Join room </h1>
         
         <form onSubmit={HandleJoinRoom}>
            
         <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email'  required/><br />
         <input type="number" value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='Enter room Id' required/><br />
         <button type='submit'>Join</button>
         </form>
       </div>
     </>
   )
}
