import React from 'react';
import ReactDOM from 'react-dom';
import './planets.css';

import Sun from "./sun.png";
import Mercury from "./mercury.png";
import Venus from "./venus.png";
import Earth from "./earth.png";
import Mars from "./mars.png";
import Jupiter from "./jupiter.png";
import Saturn from "./saturn.png";
import Uranus from "./uranus.png";
import Neptune from "./neptune.png";

const today = new Date();
const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const astroList = ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'];
// The length of a year in Earth days of each planet in order.  0 = mercury, 1 = venus, etc
const orbitDays = [87.969, 224.7, 365.2564, 686.98, 4332.82, 10755.7, 30687.15, 60190.03];
// Radial offsets planets bases on Jan 1 2016 position
const originOffset = [351.4, 201.17, 286.18, 221.48, 229.42, 142.71, 12.62, 51.97];
const daysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateDays = this.updateDays.bind(this);
    this.updatePlanets = this.updatePlanets.bind(this);
    this.state = {
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      totalDays: 31,
      planetOffsets:[0,0,0,0,0,0,0,0],
    };
  }
  componentDidMount() {
    this.updatePlanets();
  }
  updateDays(event) {
    let month = event.target.value;
    let totalDays = 31;
    switch(month) {
      case "3": // APR
      case "5": // JUN
      case "8": // SEP
      case "10": // NOV
        totalDays = 30;
        break;
      case "1": // FEB
        totalDays = (this.state.year % 4 === 0) ? 29 : 28;
        break;
    }
    let newState = this.state;
    newState.month = month;
    newState.totalDays = totalDays;
  }
  updatePlanets(event) {
    // update state on change
    let newState = this.state;
    if (event) {
      let handler = event.target;
      switch(handler.id) {
        case "DayDrop":
          newState.date =  handler.value;
          break;
        case "MonthDrop":
          newState.month =  handler.value;
          break;
        case "YearSel":
          newState.year =  handler.value;
          break;
        default:
      }
    }

    // find days since 1 Jan, 2016
    let daysSince = Number(newState.date) + Number(daysInMonth[newState.month]);
    // add a day for leap years
    if (newState.year % 4 == 0 && newState.month > 1) {
      daysSince += 1;
    }
    daysSince += (newState.year - 2016) * 365.2564;
    console.log(newState.date + " day, " + newState.month + " month, " + newState.year + " year")
    // calculates the degree of rotation base on orbit speed and date
    function calcRotate(daysInYear, daysR, mod) {
      return (((daysR % daysInYear) / daysInYear) * -360) + mod;
    }
    // changes the position of the planets
    for (let i = 0; i < astroList.length; i++) {
      newState.planetOffsets[i] = calcRotate(orbitDays[i], daysSince, originOffset[i]);
    }
    this.setState(newState);
  }
  
  render() {
    return (
      <div className="app">
        <header className="contain">
          <h2>Where Are the Planets? </h2>          
          <nav id="change" onChange={this.updatePlanets}>

            <DayDrop defaultValue={this.state.date} totalDays={this.state.totalDays} />
            <MonthDrop defaultValue={this.state.month} onChange={this.updateDays} />
            <YearSel defaultValue={this.state.year} onChange={this.updateDays} />

          </nav>
          <p>Enter a date above to see where the planets in our solar system are on that day.</p>
        </header>

        <main>
          <Planets offsets={this.state.planetOffsets} />
        </main>

        <footer className="contain">
          <p>Have any suggestions or want to see other things I've done? You can visit my portoflio at <a href="http://loganjvickery.com">loganjvickery.com</a>. Just use the contact form to get in touch. Thanks!</p>
        </footer>
      </div>
    );
  }
}

class DayDrop extends React.Component {
  render() {
    return (
      <select name="day" id="DayDrop" defaultValue={this.props.defaultValue}>
        {Array.from(Array(31)).map((x, index) => <option key={index+1} value={index+1} disabled={((index) >= this.props.totalDays) ? true : null}>{index+1}</option>)}
      </select>
    )
  }
}

class MonthDrop extends React.Component {
  render() {
    return (
      <select name="month" id="MonthDrop" defaultValue={this.props.defaultValue} onChange={this.props.onChange}>
        {Array.from(Array(months.length)).map((x, index) => <option key={months[index]} value={index}>{months[index]}</option>)}
      </select>
    )
  }
}

class YearSel extends React.Component {
  render() {
    return (
      <input type="text" name="year" id="YearSel" max-length="4" defaultValue={this.props.defaultValue}/>
    )
  }
}

class Planets extends React.Component {
  render() {
    return (
      <div id="planets">
        <img id="Neptune" src={Neptune} alt="neptune" style={{transform: "rotate(" + this.props.offsets[7] + "deg)"}} />
        <img id="Uranus" src={Uranus} alt="uranus" style={{transform: "rotate(" + this.props.offsets[6] + "deg)"}} />
        <img id="Saturn" src={Saturn} alt="saturn" style={{transform: "rotate(" + this.props.offsets[5] + "deg)"}} />
        <img id="Jupiter" src={Jupiter} alt="jupiter" style={{transform: "rotate(" + this.props.offsets[4] + "deg)"}} />
        <img id="Mars" src={Mars} alt="mars" style={{transform: "rotate(" + this.props.offsets[3] + "deg)"}} />
        <img id="Earth" src={Earth} alt="earth" style={{transform: "rotate(" + this.props.offsets[2] + "deg)"}} />
        <img id="Venus" src={Venus} alt="venus" style={{transform: "rotate(" + this.props.offsets[1] + "deg)"}} />
        <img id="Mercury" src={Mercury} alt="mercury" style={{transform: "rotate(" + this.props.offsets[0] + "deg)"}} />
        <img id="Sun" src={Sun} alt="sun" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



