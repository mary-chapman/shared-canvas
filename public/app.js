var color;
function setup() {
  createCanvas(200, 200);
  background(51);

  //client side connection to socket.io
  socket = io.connect('http://localhost:3000')

  //to handle the message coming in:
  socket.on('mouse', newDrawing)
}
//function to run when a 'mouse' message is received
function newDrawing(data) {
  noStroke();
  fill(data.c);
  ellipse(data.x, data.y, 10, 10)
}

function mouseDragged() {
  color = 150;

  console.log('sending' + mouseX + ',' + mouseY);
  //data for message to send
  var data = {
    x: mouseX,
    y: mouseY,
    c: 200
  }
  //send a message: 1. name for message (string of text)  2. data for message: object
  socket.emit('mouse', data)

  noStroke();
  fill(color);
  ellipse(mouseX, mouseY, 10, 10);
}


function draw() {
}
