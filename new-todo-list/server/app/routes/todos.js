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

function init(){
  Todo = global.nss.Todo;
}
