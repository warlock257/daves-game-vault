import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
state = {
  steamGamesOwned:[]
}

componentWillMount=() =>{
  axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A6AC823D3691198B1C41586135E6A582&steamid=76561197970418702&format=json&include_appinfo=1')
  .then((res)=>{
    console.log(res)
  })
  .catch((err) =>{
    console.log(err)
  })
}


  render() {
    let steamGamesmap = []

    return (
      <div className="App">
          <h1>Steam Game List</h1>
      </div>
    );
  }
}

export default App;
