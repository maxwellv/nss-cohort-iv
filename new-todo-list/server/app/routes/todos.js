'use strict';

var Todo;
exports.index = function(req, res){
  init();
  Todo.findAll(function(todos){
    res.send({todos:todos});
  });
};

exports.create = function(req, res){
  init();
  var t1 = new Todo(req.body);
  t1.save(function(err, ret){
    if (err instanceof Error){
      res.send('Error: ' + err.message);
    } else {
      res.send(ret);
    }
  });
};

exports.show = function(req, res){
  init();
  Todo.findById(req.params.id, function(todo){
    res.send(todo);
  });
};

exports.destroy = function(req, res){
  init();
  Todo.deleteById(req.params.id, function(count){
    res.send({count:count});
  });
};

exports.query = function(req, res){
  init();
  Todo.query(req.params, function(todos){
    res.send({todos:todos});
  });
};

exports.toggleComplete = function(req, res){
  init();
  Todo.toggleComplete(req.params.id, req.params.complete, function(result){
    res.send(result);
  });
};

function init(){
  Todo = global.nss.Todo;
}
