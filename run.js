var page = require('webpage').create();
var url='http://www.baidu.com/';

page.onConsoleMessage = function (msg) { 
	console.log("Inner log:       "+msg); 
};

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    })
}

page.onLoadFinished = function (status) {
	// page.injectJs('jquery-1.7.2.min.js');
	// page.injectJs('contentscript.js');
	page.injectJs('test.js');

        page.evaluate(function() {
        		console.log('hello');
            });
    //console.log(page.content);
    phantom.exit();
};

page.open(url);