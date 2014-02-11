(function(){

  'use strict';

  $(document).ready(initialize);
  $('#get-quote').click(getQuote);

  function initialize(){
    $(document).foundation();
  }
  function getQuote(){
    var symbol = $('#symbol').val();
    var url = window.location.origin.replace(/[0-9]{4}/g, 4000);
    url += '/quote?symbol=' + symbol + '&callback=?';
    //console.log(url);
    $.getJSON(url, function(data){
      //console.log(data);
      $('#quote').text('Quote for ' + data.symbol + ': ' + data.quote);
    });
  }

})();

