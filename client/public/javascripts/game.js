var socket = io.connect('http://localhost:8006');
socket.on('ready', function (data) {
    console.log("new event recieved"+data);
    console.log("all ready");
    socket.emit('addplayer',{playername:"craig"});
});

socket.on('added',function (data){
   console.log("added"); 
});