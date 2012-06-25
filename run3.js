var login_page = require('webpage').create();
var login_url='http://www.douban.com/update/';

login_page.onConsoleMessage = function (msg) { 
	console.log(msg); 
};

login_page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    })
}

login_page.onLoadFinished = function (status) {
	login_page.injectJs('jquery-1.7.2.min.js');
	login_page.injectJs('contentscript.js');
};

login_page.open(login_url);