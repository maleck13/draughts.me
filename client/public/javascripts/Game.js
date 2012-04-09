var socket = io.connect('http://localhost:8006');
var gameid;
var player = new Date().getTime().toString();
socket.on('ready', function (data) {
    console.log("new event recieved"+data);
    console.log("all ready");
    socket.emit('addplayer',{playername:player});
});

socket.on('added',function (data){
   console.log("added");
   socket.emit('joingame',{playername:player});
});

socket.on('gameid',function (data){
  console.log("player associated with game "+ data.id);
  gameid = data.id;
});

socket.on('gamestarted', function (data){
  console.log("recieved game started ");
  socket.emit("makemove",{game:gameid,move:{startpos:{x:1,y:1},takes:[],endpos:{x:2,y:2}}});
});

socket.on('error', function (data){
  console.log("error "+ data);
  
});

socket.on('waiting', function (data) {
  console.log("waiting " + data);
});

$('document').ready(function () {
  $('#start').click(function () {
    socket.emit("startgame",{player:player,game:gameid});
  });
});