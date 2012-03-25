$(document).ready(function(){
    
});

var socket = io.connect('http://localhost');
socket.on('ready', function (data) {
    console.log(data);
    socket.emit('addplayer', { playername: 'data' });
});
