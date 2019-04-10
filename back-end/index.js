const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//fetch Steam info
let ownedSteamGames = [];
let ownedSteamGamesCount = 0;
axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.steamKey}&steamid=76561197970418702&format=json&include_appinfo=1`)
.then((res)=>{
    ownedSteamGames = res.data.response.games;
    ownedSteamGamesCount = res.data.response.game_count;
})
.catch((err) =>{
    console.log(err)
})

//fetch xbox info
let xboxGames = []
axios.get("https://xboxapi.com/v2/2533274794827046/xboxonegames", {headers:{"x-auth":process.env.xboxKey}})
.then((res)=>{
    OwndedxboxGames = res.data.titles
    //console.log(OwndedxboxGames);
})
.catch((err) =>{
    console.log(err)
})

//fetch playstation info
const OwnedPlaystationGames = require('./playstation')
//fetch Other PC info
const OwnedPCOther = require('./pcOther')





app.get('/getOwnedSteamGames', (req, res) =>{
    res.json(ownedSteamGames)
})
app.get('/getOwnedXboxGames', (req, res) =>{
    res.json(OwndedxboxGames)
})
app.get('/OwnedPlaystationGames', (req, res) =>{
    res.json(OwnedPlaystationGames)
})
app.get('/OwnedPCOther', (req, res) =>{
    res.json(OwnedPCOther)
})






app.listen(PORT, () =>{
    console.log("listening on port: " + PORT)
})