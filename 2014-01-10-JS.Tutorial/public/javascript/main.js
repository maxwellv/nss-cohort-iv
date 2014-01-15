console.log("Hello world");
//this is a single line comment

/******************************
 * very cool
 * multi
 * line comment
 * ****************************/
console.log("Max Vance");
/*
  var a = 1;
  var b = 2;
  var c = a + b;
  var d = c + b;
  debugger;
  var e = a + d;
  console.log(e);
*/
console.log("The area of the room is " + (8 * 12) + " square feet.");
console.log("The volume of the cylinder is " + (Math.PI * Math.pow(5, 2) * 9) + " square inches.");

var room_a = 3 * 5;
var room_b = 7 * 9;
var room_c = 6 * 2;
var per_house = room_a + room_b + room_c;
var total = Math.floor(29572 / per_house);
console.log("You can paint " + total + " houses.");

/*
andromeda_distance = 2540000;
m_per_ly = 9.4607 * 10E15;
*/

/*
var first_name = prompt("Enter your first name:");
console.log("Your first name is: " + first_name);
var last_name = prompt("Enter your last name:");
console.log("Your full name is: " + first_name + " " + last_name);
*/

/*
var l = prompt("Enter the length of your room:");
l = parseInt(l);
var w = parseInt(prompt("Enter the width of your room:"));
var h = parseInt(prompt("Enter the height of your room:"));
alert("Your room's area is: " + l * w * h);
*/

var age = parseInt(prompt("Enter your age:"));
if(age < 18)
  alert("You cannot vote.");
else
  alert("You can vote.");
