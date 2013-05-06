var system = require('system');
var fs=require('fs');


console.log(system.pid);

//Open the file then ....close it...
var pidfile=fs.open("./test.test","w");
    pidfile.write(Date.now());
pidfile.close();

phantom.exit();
