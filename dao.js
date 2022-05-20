const sql = require('mssql');
const connection = 'Server=localhost,1433;Database=Racing;User Id=test;Password=password;Encrypt=false';

async function uploadCar(name, topSpeed, braking, turning){
    try{
        await sql.connect(connection);
        await sql.query`INSERT INTO Cars VALUES(${name}, ${topSpeed}, ${braking}, ${turning})`;
    } catch (err) {
        console.log(err);
    }
}

async function uploadTrack(name, topSpeed, breaking, turning){
    try{
        await sql.connect(connection);
        await sql.query`INSERT INTO Tracks VALUES(${name}, ${topSpeed}, ${breaking}, ${turning})`;
    } catch (err) {
        console.log(err);
    }
}

async function uploadSeason(name, winner){
    try{
        await sql.connect(connection);
        await sql.query`INSERT INTO Season VALUES(${name}, ${winner})`;
    } catch (err) {
        console.log(err);
    }
}

async function uploadRace(name, track, winner, season){
    try{
        await sql.connect(connection);
        await sql.query`INSERT INTO Race VALUES(${name}, ${track}, ${winner}, ${season})`;
    } catch (err) {
        console.log(err);
    }
}

async function getTable(table){
    try{
        await sql.connect(connection);
        const result = await sql.query("SELECT * FROM "+table);
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function advancedGetTable(table, requirement){
    try{
        await sql.connect(connection);
        const result = await sql.query("SELECT * FROM "+table+" WHERE "+requirement);
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function dropTable(table){
    try{
        await sql.connect(connection);
        await sql.query("TRUNCATE TABLE " + table);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    uploadCar,
    uploadTrack,
    uploadSeason,
    uploadRace,
    getTable,
    advancedGetTable,
    dropTable
};