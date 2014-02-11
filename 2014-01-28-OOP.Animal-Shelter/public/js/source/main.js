/* global Animal, animalFactory: false */
(function(){

  'use strict';

  $(document).ready(initialize);

  var animals = [];

  function initialize(){
    $('input, textarea').focusin(focusInput); //fires on gaining focus...
    $('input, textarea').blur(blurInput);     //and on losing focus
    $('#add-photo').click(addPhoto);
    $('#add-animal').click(addAnimal);

    animals = animalFactory();
    populateTable();
  }
  function focusInput(){
    $(this).css('background-color', '#bbbbbb');
  }
  function blurInput(){
    $(this).css('background-color', 'white');
  }

  function addPhoto(event){
    var URL = $('#photo').val();
    var $img = $('<img>');
    $img.attr('src', URL);
    var $a = $('<a>');
    $a.addClass('th');
    $a.append($img);
    $('#photos').append($a);
    $('#photo').text('');
    event.preventDefault();
  }

  function addAnimal(event){
    event.preventDefault();
    var species = $('#species').val();
    var color = $('#color').val();
    var age = parseInt($('#age').val());
    var gender = $('#gender').val();
    var name = $('#name').val();
    var description = $('#description').val();
    var photos = [];
    photos = getPhotos();
    //console.log(species, color, age, gender, name, description);
    //console.log(photos);
    var animal = new Animal(name, age, gender, photos, description, color, species);
    console.log(animal);
    animals.push(animal);
    populateTable();
    
  }

  function getPhotos(){
    var data = $('#photos a img');
    var toReturn = [];
    for (var x = 0;x < data.length;x++){
      toReturn[x] = data[x].src;
    }
    return toReturn;
  }

  function populateTable(){
    $('#animal-output tbody').empty();
    for (var y = 0;y < animals.length;y++){
      var tr = $('<tr>');
      var $name = $('<td>');
      $name.text(animals[y].name);
      var $age = $('<td>');
      $age = makeDataLink($age, 'age', animals[y].age);
      var $gender = $('<td>');
      $gender = makeDataLink($gender, 'gender', animals[y].gender);
      var $photos = $('<td>');
      for (var z = 0;z < animals[y].photos.length;z++){
        var pic = animals[y].photos[z];
        var $newimg = $('<img>');
        $newimg.attr('src', pic);
        var $a = $('<a>');
        $a.addClass('th');
        $a.append($newimg);
        $photos.append($newimg);
      }
      var $desc = $('<td>');
      $desc.text(animals[y].description);
      var $color = $('<td>');
      $color = makeDataLink($color, 'color', animals[y].color);
      var $species = $('<td>');
      $species = makeDataLink($species, 'species', animals[y].species);
      tr.append($name, $age, $gender, $photos, $desc, $color, $species);
      $('#animal-output tbody').append(tr);
    }

  }
  function makeDataLink(obj, search, value){
    var $link = $('<a>');
    $link.text(value);
    $link.attr('href', '#');
    $link.attr('data-search', search);
    $link.attr('data-value', value);
    return obj.append($link);
  }


})();

