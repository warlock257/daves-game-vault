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

resetInput = ()=>{
  this.setState({
    SteamFiltered:[],
    XboxFiltered:[],
    playstationfiltered:[],
    pcOtherFiltered:[]
  })
  document.getElementById("searchBar").value = ""
}

filterGames = (ev) =>{
  let SteamFiltered = this.state.steamGamesOwned;
  let XboxFiltered = this.state.xboxGamesOwned;
  let playstationfiltered = this.state.playstationGamesOwned;
  let pcOtherFiltered = this.state.pcOtherGamesOwned;

  SteamFiltered = SteamFiltered.filter((arr) =>{
    let searchString = arr.name.toLowerCase()
    return searchString.indexOf(ev.target.value.toLowerCase()) !== -1
  })

  pcOtherFiltered = pcOtherFiltered.filter((arr) =>{
    let searchString = arr.title.toLowerCase()
    return searchString.indexOf(ev.target.value.toLowerCase()) !== -1
  })

  XboxFiltered = XboxFiltered.filter((arr) =>{
    let searchString = arr.name.toLowerCase()
    return searchString.indexOf(ev.target.value.toLowerCase()) !== -1
  })

  playstationfiltered = playstationfiltered.filter((arr) =>{
    let searchString = arr.title.toLowerCase()
    return searchString.indexOf(ev.target.value.toLowerCase()) !== -1
  })

  this.setState({
    SteamFiltered:SteamFiltered,
    pcOtherFiltered:pcOtherFiltered,
    XboxFiltered:XboxFiltered,
    playstationfiltered:playstationfiltered
  })
}

  render() {
    let steamGamesMap = this.state.SteamFiltered.map((object, index) =>{
      return (<p>{this.state.SteamFiltered[index].name}</p>)
    })

    let PcOtherMap = this.state.pcOtherFiltered.map((object, index) =>{
      return (<p>{this.state.pcOtherFiltered[index].title}</p>)
    })

    let xboxGamesMap = this.state.XboxFiltered.map((object, index) =>{
      return (<p>{this.state.XboxFiltered[index].name}</p>)
    })

    let playstationGamesMap = this.state.playstationfiltered.map((object, index) =>{
      return (<p>{this.state.playstationfiltered[index].title}</p>)
    })


        return (
      <div className="App">
          <h1>Dave's Video Game Library</h1>
          <input type="text" placeholder="Search games" name="searchBar" id="searchBar" onChange={this.filterGames} />
          <button onClick={this.resetInput}>Reset</button>

          <div className="lowerHalf">

          <div className="steamResults">
            <h3>Steam</h3>
              <div>{steamGamesMap}</div>
          </div>

          <div className="PcOtherResults">
          <h3>PC Other</h3>
            <div>{PcOtherMap}</div>
          </div>

          <div className="xboxResults">
          <h3>Xbox</h3>
            <div>{xboxGamesMap}</div>
          </div>

          <div className="platstationResults">
          <h3>Playstation</h3>
            <div>{playstationGamesMap}</div>
          </div>
              
          </div>
      </div>
    );
  }
}

export default App;
