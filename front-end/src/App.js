import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
state = {
  steamGamesOwned:[],
  SteamFiltered:[],
  xboxGamesOwned:[],
  XboxFiltered:[],
  playstationGamesOwned:[],
  playstationfiltered:[],
  pcOtherGamesOwned:[],
  pcOtherFiltered:[]
}

componentWillMount=() =>{
  //steam
  axios.get("http://localhost:8080/getOwnedSteamGames")
  .then((res)=>{
    //console.log(res.data)
    this.setState({
      steamGamesOwned:res.data
    })
  })
  .catch((err) =>{
    console.log(err)
  })

  //xbox
  axios.get("http://localhost:8080/getOwnedXboxGames")
  .then((res)=>{
    //console.log(res.data)
    this.setState({
      xboxGamesOwned:res.data
    })
  })
  .catch((err) =>{
    console.log(err)
  })

  //playstation
  axios.get("http://localhost:8080/OwnedPlaystationGames")
  .then((res)=>{
    //console.log(res.data)
    this.setState({
      playstationGamesOwned:res.data
    })
  })
  .catch((err) =>{
    console.log(err)
  })

  //pc other
  axios.get("http://localhost:8080/OwnedPCOther")
  .then((res)=>{
    //console.log(res.data)
    this.setState({
      pcOtherGamesOwned:res.data
    })
  })
  .catch((err) =>{
    console.log(err)
  })
}

filterGames = (ev) =>{
  let SteamFiltered = this.state.steamGamesOwned;
  let XboxFiltered = this.state.xboxGamesOwned;
  let playstationfiltered = this.state.playstationGamesOwned;
  let pcOtherFiltered = this.state.pcOtherGamesOwned;

  XboxFiltered = XboxFiltered.filter((arr) =>{
    let searchString = arr.name.toLowerCase()
    return searchString.indexOf(ev.target.value.toLowerCase()) !== -1
  })

  pcOtherFiltered = pcOtherFiltered.filter((arr) =>{
    let searchString = arr.title.toLowerCase()
    return searchString.indexOf(ev.target.value.toLowerCase()) !== -1
  })

  this.setState({
    XboxFiltered:XboxFiltered,
    pcOtherFiltered:pcOtherFiltered
  })
}

  render() {
    let steamGamesMap = []

    let xboxGamesMap = this.state.XboxFiltered.map((object, index) =>{
      return (<p>{this.state.XboxFiltered[index].name}</p>)
    })

    let playstationGamesMap = []

    let PcOtherMap = this.state.pcOtherFiltered.map((object, index) =>{
      return (<p>{this.state.pcOtherFiltered[index].title}</p>)
    })

        return (
      <div className="App">
          <h1>Dave's Video Game Library</h1>
          <input type="text" placeholder="Search games here" name="searchBar" onChange={this.filterGames} />
          
          <div className="lowerHalf">

          <div className="xboxResults">
            <h3>Xbox</h3>
              <div>{xboxGamesMap}</div>
          </div>

          <div className="PcOtherResults">
          <h3>PC Other</h3>
            <div>{PcOtherMap}</div>
        </div>
              
          </div>
      </div>
    );
  }
}

export default App;
