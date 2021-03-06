#!/usr/bin/env node
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketserver = require('./lib/socketserver.js')
  , fs = require('fs'),
    cluster = require('cluster');
   


process.PATH =  process.PATH + ":./models:./lib";

var app = module.exports = express.createServer();
//socketserver.startSocketServer(app);
// Configuration
app.configure(function(){
    
  app.set('views', './client/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(express.static('./client/public'));

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

    //start sockets
    var sockerServer = require('./lib/socketserver.js').startSocketServer(app);
    app.listen(8006);
    
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);



