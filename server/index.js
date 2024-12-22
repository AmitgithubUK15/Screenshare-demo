const {createServer} = require("http");
const {Server} = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer,{
    cors:true
});

var EmailtoSocketIdMap = new Map();

io.on("connection",(socket)=>{
    console.log("connect new socket",socket.id);
    
    // socket.emit("msg","hello i am from server");
    socket.on("msg",(msg)=>{
        console.log(msg);
    })

    socket.on("joinroom",({email,room})=>{
        EmailtoSocketIdMap.set(email,socket.id);
        socket.join(room);
        io.to(room).emit("message",`Welcome in room ${email}`);
    })

    socket.on("incomming:call",({offer,email})=>{
       console.log(offer,email);
       const getuser = EmailtoSocketIdMap.get(email);
       socket.to(getuser).emit("incomming:handle",{offer,from:socket.id});
    })

    socket.on("call:accepted",({answer,to})=>{
        console.log(answer,to);
        socket.to(to).emit("call:accepted",answer,socket.id);
    });


    socket.on("peer:nego:needed", ({offer,to}) => {
        // console.log("peer:nego:needed", offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
      });

      socket.on("peer:nego:done", ({ to, ans }) => {
        // console.log("peer:nego:done", ans);
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
      });

    socket.on("disconnect",()=>{
      console.log("socket disconnect")
    })
})

httpServer.listen(4040,()=>{
    console.log("server is started at port 4040");
});