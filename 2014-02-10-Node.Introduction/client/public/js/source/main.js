(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#one').click(one);
    $('#two').click(two);
    $('#add').click(add);
    $('#canDrink').click(canDrink);
    $('#product').click(product);
    $('#names').click(names);
  }

  function one(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/name';
    url += '?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }
  function two(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/color';
    url += '?callback=?';
    $.getJSON(url, function(data){
      console.log(data);
    });
  }
  function add(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/add/' + $('#firstnum').val() + '/' + $('#secondnum').val();
    url += '?callback=?';
    $.getJSON(url, function(data){
      //console.log(data);
      $('#add-response').text(data.total);
    });
  }
  function canDrink(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/canDrink/' + $('#name').val() + '/' + $('#age').val();
    url += '?callback=?';
    $.getJSON(url, function(data){
      //console.log(data);
      $('#drink-response').text(data.response);
    });
  }
  function product(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/product/?numbers=' + $('#numbers').val();
    url += '&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      //console.log(data);
      $('#product-response').text(data.product);
    });
  }
  function names(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000');
    url += '/names/?names=' + $('#namelist').val();
    url += '&callback=?';
    console.log(url);
    $.getJSON(url, function(data){
      //console.log(data);
      $('#names-response').text(data.result);
    });
  }

})();

