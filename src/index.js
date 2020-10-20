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

var today = new Date();

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header className="contain">
          <h2>Where Are the Planets?</h2>
          <nav id="change" onChange={() => moveTheThings()}>
            <DayDrop />
            <MonthDrop />
            <YearSel />
          </nav>
          <p>Enter a date above to see where the planets in our solar system are on that day.</p>
        </header>

        <main>
          <Planets />
        </main>

        <footer className="contain">
          <p>Have any suggestions or want to see other things I've done? You can visit my portoflio at <a href="http://loganjvickery.com">loganjvickery.com</a>. Just use the contact form to get in touch. Thanks!</p>
        </footer>
      </div>
    );
  }
}

class Planets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      astroList: ['Neptune','Uranus','Saturn','Jupiter','Mars','Earth','Venus','Mecury','Sun'],
    };
  }
  render() {
    return (
      <div id="planets">
        {/* {Array.from(Array(this.state.astroList.length)).map((x, index) => <img key={index} id={this.state.astroList[index]} src={this.state.astroList[index]} alt={this.state.astroList[index]} />)} */}
        <img id="Neptune" src={Neptune} alt="neptune" />
        <img id="Uranus" src={Uranus} alt="uranus" />
        <img id="Saturn" src={Saturn} alt="saturn" />
        <img id="Jupiter" src={Jupiter} alt="jupiter" />
        <img id="Mars" src={Mars} alt="mars" />
        <img id="Earth" src={Earth} alt="earth" />
        <img id="Venus" src={Venus} alt="venus" />
        <img id="Mercury" src={Mercury} alt="mercury" />
        <img id="Sun" src={Sun} alt="sun" />
      </div>
    )
  }
}

class DayDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayNum: 31,
    };
  }
  render() {
    return (
      <select name="day" id="DayDrop" defaultValue={today.getDate()}>
        {Array.from(Array(this.state.dayNum)).map((x, index) => <option key={index+1} value={index+1}>{index+1}</option>)}
      </select>
    )
  }
}

class MonthDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      months: ["January","February","March","April","May","June","July",
      "August","September","October","November","December"],
    };
  }
  render() {
    return (
      <select name="month" id="MonthDrop" defaultValue={today.getMonth()}>
        {Array.from(Array(this.state.months.length)).map((x, index) => <option key={index} value={index}>{this.state.months[index]}</option>)}
      </select>
    )
  }
}

class YearSel extends React.Component {
  render() {
    return (
      <input type="text" name="year" id="YearSel" max-length="4" defaultValue={today.getFullYear()} onChange={() => moveTheThings()} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

let planetList = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
// The length of a year in Earth days of each planet in order.  0 = mercury, 1 = venus, etc
let planetYear = [87.969, 224.7, 365.2564, 686.98, 4332.82, 10755.7, 30687.15, 60190.03];
// Radial offsets planets bases on Jan 1 2016 position
let planetModifier = [351.4, 201.17, 286.18, 221.48, 229.42, 142.71, 12.62, 51.97];

//Returns the # of days since 1 Jan, 2016
function calcDaysSince(newDate) {
  let days = newDate.getDate();
  let thisMonth = newDate.getMonth();
  let daysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  days += daysInMonth[newDate.getMonth()];
  // This function adds a day if it's a leap year
  if (thisMonth > 1) {
    if (newDate.getFullYear() % 4 === 0) {
      days += 1;
    }
  }
  days += (newDate.getFullYear() - 2016) * 365.2564;
  return days;
}

//Calculates the degree of rotation when you pass in the length of one year of a planet and the number of days since
function calcRotate(daysInYear, daysR, mod) {
  return (((daysR % daysInYear) / daysInYear) * -360) + mod;
}

function moveTheThings() {
  document.querySelectorAll('#DayDrop option')[28].removeAttribute('disabled');
  document.querySelectorAll('#DayDrop option')[29].removeAttribute('disabled');
  document.querySelectorAll('#DayDrop option')[30].removeAttribute('disabled');
  let month = document.querySelector('#MonthDrop').value;
  if (month === "1") {
    if (document.querySelector('#DayDrop').value > "28") {
      document.querySelector('#DayDrop').value = "28";
    }
    document.querySelectorAll('#DayDrop option')[28].disabled = "true";
    document.querySelectorAll('#DayDrop option')[29].disabled = "true";
    document.querySelectorAll('#DayDrop option')[30].disabled = "true";
  } else if (month === "3" || month === "5" || month === "8" || month === "10") {
    if (document.querySelector('#DayDrop').value > "30") {
      document.querySelector('#DayDrop').value = "30";
    }
    document.querySelectorAll('#DayDrop option')[30].disabled = "true";
  }

  // Grabs the date info from from the inputs
  today.setDate(document.querySelector('#DayDrop').value);
  today.setMonth(document.querySelector('#MonthDrop').value);
  today.setYear(document.querySelector('#YearSel').value);
  let daysSince = calcDaysSince(today);
  //Changes the position of the planets
  for (let i = 0; i < planetList.length; i++) {
    document.querySelector('#' + planetList[i]).style.transform = 'rotate(' + calcRotate(planetYear[i], daysSince, planetModifier[i]) + 'deg)';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  moveTheThings();
});
