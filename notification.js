var login_page = require('webpage').create();
var login_url='http://www.douban.com/notification/';
var system = require('system');
var fs=require('fs');


console.log(system.pid);

//Open the file then ....close it...
var pidfile=fs.open("/root/douban-phantomjs/notification.pid","w");
    pidfile.write(system.pid);
pidfile.close();

login_page.onConsoleMessage = function (msg) {
  console.log("Inner log:       "+msg);
};

login_page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    })
}

login_page.onLoadFinished = function (status) {
  login_page.injectJs('jq1.4.4.js');
  login_page.injectJs('socket.io.js');
  login_page.injectJs('content_notification.js');
    //phantom.exit();
};

login_page.open(login_url);
