'use strict';

var Dog = require('./lib/dog');
var Cat = require('./lib/cat');

exports.create = function(req, res){
  console.log('I am the create method');
  console.log(req.query);
  var animal;
  if (req.query.type === 'dog'){
    animal = new Dog(req.query.name, req.query.gender, req.query.age);
  } else if (req.query.type === 'cat'){
    animal = new Cat(req.query.name, req.query.gender, req.query.age);
  }
  //console.log(animal);
  res.jsonp({animal:animal});
};
