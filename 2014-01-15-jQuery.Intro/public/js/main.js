//JQUERY CHEAT SHEET: http://www.oscarotero.com/jquery/

$(document).ready(initialize); //this command forces the browser to run
                               //initialize() after the page is ready
function initialize(){
  //$ invokes a jQuery command
  //$("CSS or jQuery selector")
  $("h1").css("color", "red"); //the CSS function takes two inputs, a CSS
  $("h1").css("font-size", "60px"); //attribute and a value, both as strings
  
  var currentH1Text = $("h1").text(); //text() with no args grabs text
  console.log(currentH1Text);
  $("h1").text("Welcome to JavaScript"); //this changes the selected text

  $("div").css("color", "#AA00AA");
  $("#d2").css("font-size", "9px");
  $("#d3").css("background-color", "#0000FF");
  $(".c1").css({"color":"green", "background-color":"red"});
//by declaring attributes like objects, you can do multiple changes at once
  $(".c1").text("Max");
/*
  var newColor = prompt("Enter a new color:");
  $("#d3").css("background-color", newColor);

  var newText = prompt("Enter new text for div 3:");
  $("#d3").text(newText);
*/

  //Selections like this can be referenced like arrays.
  //Example: var numPs = $(".cp").length; => # of  elements with class .cp
  //Elements in the array are DOM objects.

  //Useful class methods: .addClass("class")    => adds a class
  //                      .removeClass("class") => removes a class
  //                      .toggleClass("class") => toggles class on/off
  //                      .hasClass("class")    => returns true/false

}

