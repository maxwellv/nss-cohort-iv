(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getExercises();
    $('#create-exercise').click(createExercise);
    $('#exercises').on('click', 'tbody tr td', clickItem);
  }

  function clickItem(){
    console.log('Item clicked:');
    console.log($(this));
  }

  function createExercise(){
    var name = $('#name').val();
    var time = $('#time').val();
    var calories = $('#calories').val();
    var date = $('#date').val();
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/exercises';
    var options = {};
    options.url = url;
    options.type = 'POST';
    options.data = {name:name, time:time, calories:calories, date:date};
    options.success = exerciseCreated;

    $.ajax(options);
  }

  function exerciseCreated(data){
    console.log(data);
    $('#exercises tbody').empty();
    getExercises();
  }

  function getExercises(){
    var url = window.location.origin.replace(/3000/, '4000');
    url += '/exercises';
    console.log(url);
    $.getJSON(url, displayExercises);
  }

  function displayExercises(data){
    console.log(data);
    data = data.exercises;
    for (var x = 0;x < data.length;x++){
      var $tr = $('<tr>');
      var $name = $('<td>');
      $name.text(data[x].name);
      var $time = $('<tr>');
      $time.text(data[x].time);
      var $calories = $('<td>');
      $calories.text(data[x].calories);
      var $date = $('<td>');
      $date.text(data[x].date);
      $tr.append($name, $time, $calories, $date);
      $('#exercises tbody').append($tr);
    }
  }

})();

