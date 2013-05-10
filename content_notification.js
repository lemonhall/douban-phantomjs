(function(){
var url=location.href;
console.log("Hello form login.js");
console.log("Where Am I ??:"+location.href);

var socket = io.connect('http://localhost:9000');

if(url==='http://www.douban.com/notification/'){
    console.log("Hello form notification");
    console.log("Before:"+location.href);
    console.log("After: "+location.href);

    socket.on('hello', function (data) {
        //socket.emit('news', {my:"Hello"});
        console.log(data.my);
    });
    var req=$(".item-req");


    //存取有【提到了你】字样的提醒，并打开 
    //TODO:让这段例程有记忆能力，对已经打开过的提醒，不再打开
    //
    var queqe=[];

    //读取每一个提醒，有特征字符串的即压入处理队列
    req.each(function(idx,item){
      var html=item.innerText;
      var re = /＠提到了你/;
      var ifHas=re.test(html);
      if(ifHas){
          console.log(html);
          var content=item.innerHTML;
          //console.log(content);
          var a=$(content).find("a");
          var href=a.attr("href");
          console.log(href);
          queqe.push(href);
      }
      //console.log(item.id);
    });//End of Each.....

    //读取有提到我的提醒，然后将内容压入到node.js的例程去..
    if(queqe){
      //console.log(queqe);

      queqe.forEach(function(href){
        $.get(href,function(data){
          var html=$(data);
          var blockquote=html.find("blockquote");
          console.log(blockquote.html());
          //构造消息对象，然后POST到后端的node.js另一个组件去
          var msg={href:href,content:blockquote.html()};
          socket.emit("msg",msg);
        }); 
      });//End of forEach queqe...........

    }else{
    
        console.log("quequ is null");
    }//End of if quequ is Null?
}
if(url==='http://www.douban.com/'){
    console.log("Hello form douban.com");
    console.log("Before:"+location.href);
    location.href="http://www.douban.com/update/";
    console.log("After: "+location.href);
}
})();

