(function(){
var url=location.href;
console.log("Hello form login.js");
console.log("Where Am I ??:"+location.href);

var socket = io.connect('http://localhost:9000');

  //得到了实际的验证码之后，就可以开始登陆咯
  socket.on('onGotHello', function (data) {
  
    var href="http://www.douban.com/people/lemonhall2012/status/"+data.id;
    location.href=href;

  });

   var re = /status/;
   var ifHas=re.test(url);
  
if(ifHas){
    $("#rv_comment").val("你怎么了？");
    $("form").submit();
  }
})();

