(function(){
		console.log("Hello form test.js");
		var email=$("#email");
		var password=$("#password");
		var remember=$("#remember");
		var lzform=$("#lzform");
		var captcha=$(".item-captcha");
			email.val("lemonhall2012@qq.com");
			password.val("shengaqiao");
			remember.attr("checked",true);
		console.log(captcha.html());	
		lzform.submit();        			
		console.log("Before:"+location.href);
		location.href="http://www.baidu.com/";
		console.log("After: "+location.href);
		console.log(email.val());
		console.log(password.val());
		console.log(remember.val());

})();