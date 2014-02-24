'use strict';

var Priority;
exports.create = function(req, res){
  init();
  var p1 = new Priority(req.body);
  p1.save(function(err, ret){
    console.log('This came out of p1.save:', err, ret);
    if (err instanceof Error){
      res.send('Error: ' + err.message);
    } else {
      res.send(ret);
    }
  });
};

exports.index = function(req, res){
  init();
  Priority.findAll(function(priorities){
    res.send({priorities:priorities});
  });
};

exports.show = function(req, res){
  init();
  Priority.findById(req.params.id, function(priority){
    res.send(priority);
  });
};
/*
exports.update = function(req, res){
  init();
  var priority = new Priority(req.body);
  console.log('Is the new priority an instance of Priority?', priority instanceof Priority);
  priority.save(function(savedPriority){
    res.send(savedPriority);
  });
};
*/

exports.update = function(req, res){
  init();

  var priority = new Priority(req.body);
  priority.save(function(){
    res.send(priority);
  });
};

exports.destroy = function(req, res){
  init();

  Priority.deleteById(req.params.id, function(count){
    if (count > 0){
      res.send({count:count, id:req.params.id});
    } else {
      res.send({count:count});
    }
  });
};

function init(){
  Priority = global.nss.Priority;
}
