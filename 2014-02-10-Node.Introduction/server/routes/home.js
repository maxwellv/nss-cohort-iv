'use strict';

//var _ = require('lodash');

exports.index = function(req, res){
  res.jsonp({ok:true});
};

exports.name = function(req, res){
  console.log('I have just received a message from the browser');
  res.jsonp({name:'my name is node'});
};

exports.color = function(req, res){
  console.log('I have just received a color request from the browser');
  res.jsonp({color:'#333333'});
};

exports.add = function(req, res){
  console.log('I have just received an add request from the browser');
  console.log(req.params);
  var sum = parseFloat(req.params.a) + parseFloat(req.params.b);
  res.jsonp({total: sum});
};

exports.canDrink = function(req, res){
  console.log('I have just received a canDrink request from the browser');
  var age = req.params.b;
  var resp;
  if (age >= 21){
    resp = 'yes';
  } else if (age >= 18) {
    resp = 'maybe';
  } else {
    resp = 'no';
  }
  resp = 'Can ' +  req.params.a + ' drink? ' + resp;
  res.jsonp({response: resp});
};

exports.names = function(req, res){
  console.log('This is the names function');
  var nameArray = req.query.names.split(', ');
  console.log(nameArray);
  var result = 0;
  for (var x = 0;x < nameArray.length;x++){
    if (nameArray[x].length % 2 === 1){
      result += nameArray[x].length;
    }
  }
  if (result % 2 === 0){
    result = Math.pow(result, 3);
  } else {
    result = Math.pow(result, 2);
  }
  res.jsonp({result:result});
};
