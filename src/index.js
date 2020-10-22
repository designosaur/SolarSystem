/* App not working as written below.  Refactor in progress as of OCt.21.2020*/

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
const months = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const astroList = ['Neptune','Uranus','Saturn','Jupiter','Mars','Earth','Venus','Mecury','Sun'];
// The length of a year in Earth days of each planet in order.  0 = mercury, 1 = venus, etc
const orbitDays = [87.969, 224.7, 365.2564, 686.98, 4332.82, 10755.7, 30687.15, 60190.03];
// Radial offsets planets bases on Jan 1 2016 position
const originOffset = [351.4, 201.17, 286.18, 221.48, 229.42, 142.71, 12.62, 51.97];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateDays = this.updateDays.bind(this);
    this.state = {
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      totalDays: 31,
    };
  }
  updateDays(event) {
    console.log(event.target.value);
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
    console.log(totalDays)
    this.setState(newState);
    console.log(this.state.month)
  }
  updatePlanets(event) {
    console.log('do a little dance');
    // will add more code here later

  }
  render() {
    return (
      <div className="app">
        <header className="contain">
          <h2>Where Are the Planets? </h2>
          <nav id="change" onChange={this.updatePlanets}>
            {console.log(this.state)}

            <DayDrop defaultValue={this.state.date} totalDays={this.state.totalDays} />
            <MonthDrop defaultValue={this.state.month} onChange={this.updateDays} />
            <YearSel defaultValue={this.state.year} onChange={this.updateDays} />

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

class DayDrop extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     totalDays: 30,
  //   };
  // }
  // onChange(value,field) {
  //   this.setState({value: value});
  // }
  render() {
    return (
      <select name="day" id="DayDrop" defaultValue={this.props.defaultValue}>
        {Array.from(Array(31)).map((x, index) => <option key={index+1} value={index+1} disabled={((index) >= this.props.totalDays) ? true : null}>{index+1}</option>)}
      </select>
    )
  }
}

class MonthDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDays: 31,
    };
  }
  render() {
    return (
      <select name="month" id="MonthDrop" defaultValue={this.props.defaultValue} onChange={this.props.onChange}>
        {Array.from(Array(months.length)).map((x, index) => <option key={index} value={index}>{months[index]}</option>)}
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
  constructor(props) {
    super(props);
    this.state = {
      };
  }
  render() {
    return (
      <div id="planets">
        {/* {Array.from(Array(astroList.length)).map((x, index) => <img key={index} id={astroList[index]} src={astroList[index]} alt={astroList[index]} />)} */}
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



// //Returns the # of days since 1 Jan, 2016
// function calcDaysSince(newDate) {
//   let days = newDate.getDate();
//   let thisMonth = newDate.getMonth();
//   let daysInMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
//   days += daysInMonth[newDate.getMonth()];
//   // This function adds a day if it's a leap year
//   if (thisMonth > 1) {
//     if (newDate.getFullYear() % 4 === 0) {
//       days += 1;
//     }
//   }
//   days += (newDate.getFullYear() - 2016) * 365.2564;
//   return days;
// }

// //Calculates the degree of rotation when you pass in the length of one year of a planet and the number of days since
// function calcRotate(daysInYear, daysR, mod) {
//   return (((daysR % daysInYear) / daysInYear) * -360) + mod;
// }

// function moveTheThings() {
//   // document.querySelectorAll('#DayDrop option')[28].removeAttribute('disabled');
//   // document.querySelectorAll('#DayDrop option')[29].removeAttribute('disabled');
//   // document.querySelectorAll('#DayDrop option')[30].removeAttribute('disabled');
//   let month = document.querySelector('#MonthDrop').value;
//   if (month === "1") {
//     if (document.querySelector('#DayDrop').value > "28") {
//       document.querySelector('#DayDrop').value = "28";
//     }
//     // document.querySelectorAll('#DayDrop option')[28].disabled = "true";
//     // document.querySelectorAll('#DayDrop option')[29].disabled = "true";
//     // document.querySelectorAll('#DayDrop option')[30].disabled = "true";
//   } else if (month === "3" || month === "5" || month === "8" || month === "10") {
//     if (document.querySelector('#DayDrop').value > "30") {
//       document.querySelector('#DayDrop').value = "30";
//     }
//     // document.querySelectorAll('#DayDrop option')[30].disabled = "true";
//   }

//   // Grabs the date info from from the inputs
//   today.setDate(document.querySelector('#DayDrop').value);
//   today.setMonth(document.querySelector('#MonthDrop').value);
//   today.setYear(document.querySelector('#YearSel').value);
//   let daysSince = calcDaysSince(today);
//   //Changes the position of the planets
//   for (let i = 0; i < astroList.length; i++) {
//     document.querySelector('#' + astroList[i]).style.transform = 'rotate(' + calcRotate(orbitDays[i], daysSince, originOffset[i]) + 'deg)';
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   moveTheThings();
// });

