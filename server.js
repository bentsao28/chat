var express = require("express");
var path = require("path");
var app = express();
// var history = [];
var server = app.listen(8001, function(){
	console.log('listening on port 8001');
})
var io = require("socket.io").listen(server);
io.sockets.on('connection', function(socket){
	var user = "";
	console.log("socket ready");
	socket.on('name', function(data){
		console.log(data.name + " has signed in");
		color = Math.floor((Math.random() * 10) + 1);
		user = data.name;
		// socket.emit('history', history);
		io.emit('login', {name: data.name});
	})
	socket.on('message', function(data){
		console.log(data.message);
		io.emit('broadcast', {message: data.message, name: data.name});
		// history.push(data);
		// console.log(history);
	})
	socket.on('disconnect', function(){
		console.log("signed off" + user);
		io.emit('leave', {user: user});
	})
})
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
	res.render("index");
})