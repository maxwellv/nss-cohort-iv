/* global Animal: false */
(function(){

  'use strict';

  window.animalFactory = function(){
    var animals = [];
    var animal;
    var photos = [];
    photos[0] = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Eastern_Grey_Squirrel_in_St_James%27s_Park%2C_London_-_Nov_2006_edit.jpg/220px-Eastern_Grey_Squirrel_in_St_James%27s_Park%2C_London_-_Nov_2006_edit.jpg';
    animal = new Animal('Test Animal', 999, 'M', photos, 'this is a test animal', 'gray', 'squirrel');
    animals.push(animal);
    animal = new Animal('Test Animal 2', 1, 'F', ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shetland_Sheepdog_600.jpg/220px-Shetland_Sheepdog_600.jpg'], 'this is a test animal 2', 'red', 'dog');
    animals.push(animal);
    animal = new Animal('Test Animal 3', 2, 'M', ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Megalithic_grave_Harhoog_in_Keitum%2C_Sylt%2C_Germany.jpg/800px-Megalithic_grave_Harhoog_in_Keitum%2C_Sylt%2C_Germany.jpg'], 'this is a test animal 3', 'gray', 'cat');
    animals.push(animal);
    animal = new Animal('Test Animal 4', 3, 'F', ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Apis_mellifera_flying.jpg/800px-Apis_mellifera_flying.jpg'], 'this is a test animal 44', 'green', 'dog');
    animals.push(animal);
    animal = new Animal('Test Animal 5', 4, 'M', ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Calliptamus_italicus03.jpg/320px-Calliptamus_italicus03.jpg'], 'this is a test animal 5', 'gray', 'cat');
    animals.push(animal);
    animal = new Animal('Test Animal 6', 5, 'F', ['https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/200px-Twitter_bird_logo_2012.svg.png'], 'this is a test animal 6', 'blue', 'dog');
    animals.push(animal);

    return animals;
  };

})();
