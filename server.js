//imports the express module
var express = require('express');
//imports the socket module
var socket = require('socket.io');

//creates an express app
var app = express();

//creates a server
var server = app.listen(3000);
console.log("my socket server is running");

//if the user visits the site, the app will show the static files in the public directory
app.use(express.static('public'));

//keeps track of the input and output messages
var io = socket(server);

//whenever there is a connection, run a callback function
io.sockets.on('connection', newConnection);
//callback function
  //callback function comes with an a socket object
function newConnection(socket) {
  //every connection to the server has its own id (socket.id)
  console.log('new connection: ' + socket.id);
  //if theres a message called 'mouse', triggers the mouseMsg fn
  socket.on('mouse', mouseMsg);
  //the data is the data object from the client side
  function mouseMsg(data) {
    //sends message back out
    socket.broadcast.emit('mouse', data)
    //to also include client that sends message: io.sockets.emit('mouse', data);
    console.log(data)
  }
}
