'use strict';

module.exports = Priority;
var priorities = global.nss.db.collection('priorities');
var ObjectID = require('mongodb').ObjectID;

function Priority(obj){
  this._id = obj._id;
  this.name = obj.name;
  this.value = parseInt(obj.value);
}

Priority.prototype.save = function(fn){
  var what = this;
  Priority.findByName(this.name, function(resp){
    if (resp.length < 1){
      priorities.save(what, function(err, record){
        //console.log(typeof record);
        //console.log(record instanceof Priority);
        fn(record);
      });
    } else {
      fn('');
    
  });
};

Priority.findAll = function(fn){
  priorities.find().toArray(function(err, resp){
    fn(resp);
  });
};

Priority.findByName = function(name, fn){
  priorities.find({name: name}).toArray(function(err, resp){
    fn(resp);
  });
};

Priority.findByID = function(id, fn){
  priorities.find({_id: new ObjectID(id)}).toArray(function(err, resp){
    fn(new Priority(resp[0]));
  });
};
