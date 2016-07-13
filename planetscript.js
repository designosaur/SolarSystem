//Get today's date & set some variables
var today = new Date();
daybt.value = today.getDate();
monthbt.value = today.getMonth();
yearbt.value = today.getFullYear();

//Returns the # of days since 1 Jan, 2016
function calcDaysSince(newDate) {
	var days = newDate.getDate();
	var thisMonth = newDate.getMonth();
	var daysInMonth = [0,31,59,90,120,151,181,212,243,273,304,334];
	days += daysInMonth[newDate.getMonth()];
	//This function adds a day if it's a leap year
	if (thisMonth > 1 ) {
		if (newDate.getFullYear() % 4 === 0 ) {
			days += 1;
		}
	}
	days += (newDate.getFullYear() - 2016) * 365.2564;
	return days;
}

//The length of a year in Earth days of each planet in order.  0 = mercury, 1 = venus, etc
var planetYear = [87.969, 224.7, 365.2564, 686.98, 4332.82, 10755.7, 30687.15, 60190.03];

//An array of planet element ID's
var images = ['#mercury_img','#venus_img','#earth_img','#mars_img','#jupiter_img','#saturn_img','#uranus_img','#neptune_img'];

//Offsets planets bases on Jan 1 2016 position
var planetModifier = [351.4,201.17,286.18,221.48,229.42,142.71,12.62,51.97];

//Calculates the degree of rotation when you pass in the length of one year of a planet and the number of days since
function calcRotate(daysInYear, daysR, mod) {
	return (((daysR % daysInYear) / daysInYear) * -360) + mod;
}

//Move all the things
function moveTheThings() {
// Grabs the date info from from the inputs
	today.setDate(document.querySelector('#daybt').value);
	today.setMonth(document.querySelector('#monthbt').value);
	today.setYear(document.querySelector('#yearbt').value);
	var daysSince = calcDaysSince(today);
	//Changes the position of the planets
	for (i = 0; i < images.length; i++) {
		document.querySelector(images[i]).style.webkitTransform='rotate('+calcRotate(planetYear[i], daysSince, planetModifier[i])+'deg)';
		document.querySelector(images[i]).style.msTransform='rotate('+calcRotate(planetYear[i], daysSince, planetModifier[i])+'deg)';
		document.querySelector(images[i]).style.transform='rotate('+calcRotate(planetYear[i], daysSince, planetModifier[i])+'deg)';
	}
}

//Moves the things onLoad
document.addEventListener("DOMContentLoaded", function() {
	moveTheThings();
});

//Call function when the button is pressed
document.querySelector("button").addEventListener("click", function() {
	moveTheThings();
});

/*
$(document).ready(function(){
	$("button").click(function(){
		moveTheThings();
	});
});
*/
