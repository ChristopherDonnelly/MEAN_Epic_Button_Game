var express = require( "express");
var path = require( "path");

// Create the express app.
var app = express();

// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Root route to render the index.ejs view.
app.get('/', function(req, res) {
    res.render("index");
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

var count = 0;

io.sockets.on('connection', function(socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    
    socket.emit("broadcast_event", {count: count});

    socket.on("button_clicked", function (){
        count++;

        io.emit("broadcast_event", {count: count});
    });

    socket.on("reset_clicked", function (){
        count = 0;

        io.emit("broadcast_event", {count: count});
    });

});