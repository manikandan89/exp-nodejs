var express = require('express');
var app = express();
var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoose = require('mongoose');

//var connectionStringRemote = process.env.OPENSHIFT_MONGODB_DB_URL + "nodejsexp"; 
//var connectionLocal =  'mongodb://localhost/cs5610';
//var connectionString = connectionStringRemote || connectionLocal;
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/cs5610';
mongoose.connect(connectionString);


//mongoose.connect('mongodb://localhost/cs5610');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

app.get('/hello', function (req, res) {
    res.send('hello world');
});

app.get('/bye', function (req, res) {
    res.send('Good bye');
});

var PlayerSchema = new mongoose.Schema({
    name: String,
    country: String,
    club: String
});

var Player = mongoose.model('Player', PlayerSchema);

//var players = [
//    { name: "Nadal", details: [
//        {hand: "left", country: "Spain"}
//    ]},
//    { name: "Roger", details: [
//        {hand: "right", country: "Switzerland"}
//    ]},
//    { name: "Novak", details: [
//        {hand: "right", country: "Serbia"}
//    ]},
//    { name: "Andy" , details: [
//        {hand: "right", country: "Britain"}
//    ]}
//];

//var player1 = new Player({
//    name: "Rooney",
//    country: "England",
//    club: "Manchester united" 
//});

//var player2 = new Player({
//    name: "Ronaldo",
//    country: "Portugal",
//    club: "Real Madrid"
//});

//var player3 = new Player({
//    name: "Messi",
//    country: "Argentina",
//    club: "Barcelona"
//});

//player1.save();
//player2.save();
//player3.save();


app.get("/api/players", function (req, res) {
    Player.find(function (err, docs) {
        res.json(docs);
    });
});

app.get("/api/players/:id", function (req, res) {
    Player.findById(req.params.id,function (err, doc) {
        res.json(doc);
    });
});

app.delete("/api/players/:id", function (req, res) {
    Player.remove({ _id: req.params.id }, function (err,doc) {
        Player.find(function (err, docs) {
            res.json(docs);
        });
    })
    //players.splice(req.params.id, 1);
    //res.json(players);
});

app.post("/api/players", function (req, res) {

    var newplayer = new Player(req.body);
    newplayer.save(function (err,doc) {
        Player.find(function (err, docs) {
            res.json(docs);
        });
    });
   
});

app.put("/api/players/:id", function (req, res) {

    var index = req.params.id;
    players[index] = req.body;
    res.json(players);
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);