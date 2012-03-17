var spawn = require('child_process').spawn;

desc('Running Tests.');
task('test', [], function (params) {
    var mocha = spawn('mocha',['-r','should','-r',  '..server/lib/gamemanager']);
    mocha.stdout.on('data',function(data){
        console.log(data.toString());
    });
    mocha.stderr.on('data',function (data){
        console.log(data.toString());
    });
});

desc("clean project");
task("clean",[],function () {
    
});