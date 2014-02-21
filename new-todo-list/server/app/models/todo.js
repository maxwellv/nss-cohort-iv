'use strict';

module.exports = Todo;
var todos = global.nss.db.collection('todos');
var Mongo = require('mongodb');

function Todo(todo){
  this._id = todo._id;
  this.name = todo.name;
  this.dueDate = todo.dueDate; //expecting a JavaScript date object
  this.isComplete = (todo.isComplete ? true : false); //null or undefined will make this false, of course
  this.tags = todo.tags;
  this.priority = Mongo.ObjectID(todo.priority.toString());
}

Todo.prototype.save = function(fn){
  /*
  var self = this;
  if (self._id){
    todos.save(self, function(err, record){
      fn(err, record);
    });
  } else {
    Todo.findByName(self.name, function(todo){
      if (!todo){
        todos.save(self, function(err, record){
          fn(err, record);
        });
      } else {
        fn(new Error('Duplicate Todo'), null);
      }
    });
  }
  */
  todos.save(this, function(err, record){
    fn(err, record);
  });
};

Todo.findAll = function(fn){
  todos.find().toArray(function(err, records){
    fn(records);
  });
};

Todo.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  todos.findOne({_id:_id}, function(err, records){
    fn(records ? new Todo(records) : null);
  });
};

Todo.findByName = function(name, fn){
  todos.findOne({name:name}, function(err, records){
    fn(records ? new Todo(records) : null);
  });
};

Todo.findByComplete = function(complete, fn){
  todos.find({isComplete:complete}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByPriority = function(priority, fn){
  priority = Mongo.ObjectID(priority);
  todos.find({priority:priority}).toArray(function(err, records){
    fn(records);
  });
};

Todo.findByTag = function(tag, fn){
  todos.find({tags: {$in: [tag]}}).toArray(function(err, records){
    fn(records);
  });
};

Todo.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  todos.remove({_id:_id}, function(err, deletedCount){
    fn(deletedCount);
  });
};
