'use strict';

function Exercise(name, time, calories, date){
  this.name = name;
  this.time = parseFloat(time);
  this.calories = parseFloat(calories);
  this.date = date;
}

module.exports= Exercise;
