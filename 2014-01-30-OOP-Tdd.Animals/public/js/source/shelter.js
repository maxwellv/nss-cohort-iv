/* jshint unused:false */
var Shelter = (function(){
  'use strict';

  function Shelter(name){
    this.name = name;
    this.location = 'not defined';
    this.capacity = 0;
    this.hours = '';
  }
  Shelter.prototype.setHours = function(hours){
      for (var x = 0;x < hours.length;x++){
        var day = hours[x].day;
        var open = hours[x].open;
        var close = hours[x].close;
        this.hours = this.hours + day + ': ' + open + ' - ' + close;
        if (x !== hours.length - 1){
          this.hours = this.hours + ', ';
        }
      }
    };
  return Shelter;
})();
