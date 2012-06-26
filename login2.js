(function(){
var url=location.href;
console.log("Hello form login.js");
console.log("Where Am I ??:"+location.href);
if(url==='http://www.douban.com/accounts/login'){
		console.log("Hello form accounts/login");
		var email=$("#email");
		var password=$("#password");
		var remember=$("#remember");
		var lzform=$("#lzform");
		var captcha=$(".item-captcha");
		console.log(captcha.html());
		//delay 10s
		if(captcha.html()===null){ 
			var t=setTimeout(function(){
				location.href="http://www.douban.com/accounts/login";
			},10000);
		}
}
if(url==='http://www.douban.com/update/'){
		console.log("Hello form douban/update");
		console.log("Before:"+location.href);
		console.log("After: "+location.href);
}
if(url==='http://www.douban.com/'){
		console.log("Hello form douban/update");
		console.log("Before:"+location.href);
		location.href="http://www.douban.com/update/";
		console.log("After: "+location.href);
}
})();