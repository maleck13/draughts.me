/**
 * Created by JetBrains WebStorm.
 * User: craigbrookes
 * Date: 19/03/2012
 * Time: 19:45
 * To change this template use File | Settings | File Templates.
 */

var spawn = require('child_process').spawn;

var app = spawn('./app.js',[],{env:{PATH:'/usr/local/bin'}});

app.stdout.on('data', function (data){
   console.log(data.toString()); 
});

app.stderr.on('data',function(data){
   console.log(data.toString()); 
});
    