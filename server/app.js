#!/usr/bin/env node
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketserver = require('./lib/socketserver.js')
  , fs = require('fs'),
    cluster = require('cluster');
   


process.PATH =  process.PATH + ":./models";

var app = module.exports = express.createServer();
//socketserver.startSocketServer(app);
// Configuration
app.configure(function(){
    
  app.set('views', '../client/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(express.static('../client/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);


//set up multiple processes
if(cluster.isMaster){
    for(var i=0; i<2; i++){
       var worker = cluster.fork();
        worker.on('message',function (msg) {
           console.log(msg); 
        });
    }
  
    //start sockets
   // socketserver.startSocketServer(app);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}else{
    //start sockets

    app.listen(8006);
    
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}


