const sql = require('mssql');
const connection = 'Server=localhost,1433;Database=ArmyBuilder;User Id=test;Password=password;Encrypt=false';

async function post(armyName, warlordName, numInfantry, numCavalry, AF){
    try{
        await sql.connect(connection);
        const result = await sql.query`INSERT INTO Army VALUES(${armyName}, ${warlordName}, ${numInfantry}, ${numCavalry}, ${AF})`;
    } catch (err) {
        console.log(err);
    }
}

async function getArmies(){
    try{
        await sql.connect(connection);
        const result = await sql.query`SELECT * FROM Army`;
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getArmyStats(army){
    try{
        await sql.connect(connection);
        const result = await sql.query`SELECT * FROM Army WHERE armyName = ${army}`;
        return result;
    } catch (err){
        console.log(err);
    }
}

async function updateBattleTable(battleName, army1, army2, army1Strength, army2Strength, winner){
    try{
        await sql.connect(connection);
        const result = await sql.query`INSERT INTO Battles VALUES(${battleName}, ${army1}, ${army2}, ${army1Strength}, ${army2Strength}, ${winner})`
    } catch (err){
        console.log(err);
    }
}

async function getBattles(){
    try{
        await sql.connect(connection);
        const result = await sql.query`SELECT * FROM Battles`;
        return result;
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    post,
    getArmies,
    getArmyStats,
    updateBattleTable,
    getBattles
}