const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const dao = require('./dao.js');
const e = require('express');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '\\public\\index.html')
  
})



app.get("/post", async (req, res) => {
  var armyName = req.query.armyName;
  var warlordName = req.query.warlordName;
  var numInfantry = req.query.numInfantry;
  var numCavalry = req.query.numCavalry;
  var AF = req.query.AF;
  if(AF == "yes"){
    AF = 1;
  }else{
    AF = 0;
  }
  await dao.post(armyName, warlordName, numInfantry, numCavalry, AF);
  res.sendStatus(200);
});

app.get("/getArmies", async (req, res) => {
  var armies = await dao.getArmies();
  res.send(armies);
});

app.get("/getBattles", async (req, res) => {
  var battles = await dao.getBattles();
  res.send(battles);
});

app.get("/battle", async (req, res) => {
  var army1 = req.query.army1;
  var army2 = req.query.army2;
  var name = req.query.name;
  var army1Stats = await dao.getArmyStats(army1);
  var army2Stats = await dao.getArmyStats(army2);
  var army1Power = calculatePower(army1Stats.recordset[0].infantry, army1Stats.recordset[0].cavalry, army1Stats.recordset[0].AF);
  var army2Power = calculatePower(army2Stats.recordset[0].infantry, army2Stats.recordset[0].cavalry, army2Stats.recordset[0].AF);
  var winner;
  if(army1Power > army2Power){
    winner = army1;
  }else if(army2Power > army1Power){
    winner = army2;
  }else{
    winner = "Tie";
  }
  await dao.updateBattleTable(name, army1, army2, army1Power, army2Power, winner);
  res.send(army1Power + " vs. " + army2Power + "<br>" + winner);
});

function calculatePower(infantry, cavalry, AF){
  var power = random(infantry) + (random(cavalry) * 3);
  if(AF == true){
    power *= 2;
  }
  return power;
}

function random(max){
  return Math.floor(Math.random() * max);
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})