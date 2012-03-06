var http = require('http');
var fs   = require('fs');

http.createServer(function (req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile("./views/index.html");
}).listen(8006);