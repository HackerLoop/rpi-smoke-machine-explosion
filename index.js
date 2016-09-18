// Require HTTP module (to start server) and Socket.IO
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var omx = require('omxdirector');

var GPIO = require('onoff').Gpio;
var Relay1 = new GPIO(18, 'out');
Relay1.writeSync(1);

http.listen(3000, function(){
  console.log('started server on port :3000');
});

app.get('/bomb', function(req, res){
    setTimeout(function() {playAudio('boum.mp3');}, 500);
    setRelay(Relay1, 0);
    setTimeout(function() {setRelay(Relay1 , 1);}, 5000);
});

function setRelay(gpio, value){
  gpio.writeSync(value);
}

function playAudio(path){
  omx.play(path);
}
