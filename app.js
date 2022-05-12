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
  var name = req.query.name;
  var track = req.query.racedAt;
  var winner = req.query.winner;
  var season = req.query.season;
  await dao.uploadRace(name, track, winner, season);
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})