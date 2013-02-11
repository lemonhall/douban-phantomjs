var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(9000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
//phantomjs向服务器发起这个信号
//然后服务器向所有连接过来的客户端发起
//OK，得到了一个新的验证码的信息的信号
  socket.on('Got_captcha', function (data) {
      //socket.emit('news', {my:"Hello"});
      socket.broadcast.emit('onGot_Captach_txt',data);
  });


  socket.on('onGot_Captach_img', function (data) {
      //socket.emit('news', {my:"Hello"});
      socket.broadcast.emit('news',data);
  });
});