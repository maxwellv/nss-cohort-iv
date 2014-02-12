'use strict';
var MongoClient = require('mongodb').MongoClient;
var Exercise = require('../models/exercise');

exports.create = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db) {
    if (err) {throw err;}
    //var exercise = {name:req.body.name, time:parseFloat(req.body.time), calories:parseFloat(req.body.calories), date:req.body.date};
    var newExercise = new Exercise(req.body.name, req.body.time, req.body.calories, req.body.date);
    db.collection('exercises').insert(newExercise, function(err, records){
      console.log('RECORDS INSERTED');
      console.log(records);
      res.send(records[0]);
    });
  });
};

exports.index = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db) {
    if (err) {throw err;}
    //res.send(db.collection('exercises').find());
    db.collection('exercises').find().toArray(function(err, exercises){
      res.send({exercises:exercises});
    });
  });
};

exports.queryName = function(req, res){
  MongoClient.connect('mongodb://localhost/gym', function(err, db) {
    if (err) {throw err;}
    console.log(req.params.name);
    db.collection('exercises').find({name:req.params.name}).toArray(function(err, exercises){
      res.jsonp({exercises:exercises});
    });
  });
};
