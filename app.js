const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { DateTimeOffset } = require('mssql');
const dao = require('./dao.js');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '\\public\\index.html')
  
})

app.get('/uploadCar', async (req, res) => {
  var name = req.query.name;
  var topSpeed = req.query.topSpeed;
  var breaking = req.query.breaking;
  var turning = req.query.turning;
  await dao.uploadCar(name, topSpeed, breaking, turning);
  res.sendStatus(200);
});

app.get('/uploadTrack', async (req, res) => {
  var name = req.query.name;
  var topSpeed = req.query.topSpeed;
  var breaking = req.query.breaking;
  var turning = req.query.turning;
  await dao.uploadTrack(name, topSpeed, breaking, turning);
  res.sendStatus(200);
});

app.get('/uploadSeason', async (req, res) => {
  var name = req.query.name;
  var winner = req.query.winner;
  await dao.uploadSeason(name, winner);
  res.sendStatus(200);
});

app.get('/uploadRace', async (req, res) => {
  //Inputs
  var name = req.query.name;
  var track = req.query.track;
  var racers = JSON.parse(req.query.racers);
  var season = req.query.season;
  //Track Stats
  var trackStats = await dao.advancedGetTable("Tracks", "name = '"+track+"'");
  var trackSpeed = trackStats.recordset[0].topSpeed;
  var trackBraking = trackStats.recordset[0].breaking;
  var trackTurning = trackStats.recordset[0].turning;
  //Calculate winner
  var highestPower = 0;
  var winner;
  //console.log(racers);
  for(let i = 0; i < racers.length; i++){
    var racerStats = await dao.advancedGetTable("Cars", "name = '"+racers[i]+"'");
    var racerSpeed = racerStats.recordset[0].topSpeed;
    var racerBraking = racerStats.recordset[0].breaking;
    var racerTurning = racerStats.recordset[0].turning;
    var racingPower = (racerSpeed*trackSpeed)+(racerBraking*trackBraking)+(racerTurning*trackTurning);
    if(racingPower > highestPower){
      highestPower = racingPower;
      winner = racerStats.recordset[0].name;
    }
  }
  console.log(winner);
  await dao.uploadRace(name, track, winner, season);
  res.sendStatus(200);
});

app.get('/getTable', async (req, res) => {
  res.send(await dao.getTable(req.query.table));
});

app.get('/dropTable', async (req, res) => {
  res.send(await dao.dropTable(req.query.table));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})