(function(){
var url=location.href;
console.log("Hello form login.js");
console.log("Where Am I ??:"+location.href);

var socket = io.connect('http://localhost:9000');

if(url==='https://www.douban.com/accounts/login?redir=http%3A//www.douban.com/update/'){
		console.log("Hello form accounts/login");
		var email=$("#email");
		var password=$("#password");
		var remember=$("#remember");
		var lzform=$("#lzform");
		var captcha=$(".item-captcha");
		var captcha_img=$("#captcha_image");
		var captcha_field=$("#captcha_field");
		var captach_img_url=captcha_img.attr("src");
		//与一个Node的server协作，用一个游览器打开那个地址
		//函数向server，post验证码的图像地址
		//人用游览器看着那个地址，并键入验证码
		//而后返回的值会作为最后的键入
		//可能最后得用到Dnode或者now.js这类的长链接框架
	


	//得到了实际的验证码之后，就可以开始登陆咯
	socket.on('onGot_Captach_txt', function (data) {
	      //socket.emit('news', {my:"Hello"});
	      console.log(data.text);
	        var captcha_field_text=data.text||"";
	      	email.val("lemonhall@foxmail.com");
			password.val("shengaqiao");
			captcha_field.val(captcha_field_text);
			remember.attr("checked",true);
			lzform.submit();
	});

  	//发送验证码的图片地址到Node服务器，并交给另一个事先打开的游览器
  	//渲染，并由人类识别后传回phantomjs
	if(captach_img_url!=null || captach_img_url!=undefined){
		//get_CaptachImgFromNodeServer(captach_img_url);

		socket.emit('onGot_Captach_img', { img_url: captach_img_url});

	}

		console.log(captcha.html());
		console.log(captcha_img.attr("src"));
}
if(url==='http://www.douban.com/update/'){
		console.log("Hello form douban/update");
		console.log("Before:"+location.href);
		console.log("After: "+location.href);

	  socket.on('hello', function (data) {
	      //socket.emit('news', {my:"Hello"});
	      console.log(data.my);
	  });

		//var test=$(".mod").text();
		//console.log(test);
	
			var t=setTimeout(function(){
				var reshare=$(".btn-reshare");
				console.log(reshare);
        console.log("reshare length: "+reshare.length);
				if(reshare!=null && reshare!=undefined){
					reshare.trigger("click");
					console.log("I am trigger????");
				}
				socket.emit("hello", { my:"hello"});
				console.log($(".btn-reshare").html());
				window.location.reload();
			},50000);

}
if(url==='http://www.douban.com/'){
		console.log("Hello form douban.com");
		console.log("Before:"+location.href);
		location.href="http://www.douban.com/update/";
		console.log("After: "+location.href);
}
})();
