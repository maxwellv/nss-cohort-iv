/* jshint camelcase:false */
(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#get-weather').click(getWeather);
  }
  function getWeather(){
    var URL = 'http://api.wunderground.com/api/7c46208d975d14ef/conditions/q/TN/Nashville.json?callback=?';
    //add the "?callback=?" to these things, it's necessary for some dumb security reason
    $.getJSON(URL, receive);
  }
  function receive(data){
    var temp = data.current_observation.temperature_string;
    $('#temperature').text('Current temperature in Nashville, TN: ' +  temp);
  }
})();
