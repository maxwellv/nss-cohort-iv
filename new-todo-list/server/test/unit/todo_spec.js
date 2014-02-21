/* jshint expr:true */
'use strict';

var assert = require('chai').assert;
var Todo, Priority;
var testPriority;
describe('Todo', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Todo = global.nss.Todo;
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      var beforePriority = new Priority({name:'High', value:'10'});
      beforePriority.save(function(err, savedPriority){
        testPriority = savedPriority;
        done();
      });
    });
  });

  describe('new', function(){
    it('should create a new Todo and save it into the DB', function(done){
      var priorityID = testPriority._id.toString();
      var obj = {name:'finish this damn site', dueDate: new Date(), tags: ['foo', 'bar'], priority: priorityID};
      var t1 = new Todo(obj);
      t1.save(function(err, savedTodo){
        assert.instanceOf(savedTodo, Todo, 'the saved Todo should ba an instanceof Todo');
        assert.property(savedTodo, '_id', 'the saved Todo should have an ID');
        assert.ok(savedTodo._id, 'the ID should be a truthy value');
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should return all Todos in the database', function(done){
      var priorityID = testPriority._id.toString();
      var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:priorityID});
      var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['two'], priority:priorityID});
      var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three'], priority:priorityID});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findAll(function(todos){
              assert.lengthOf(todos, 3);
              done();
            });
          });
        });
      });
    });
  });

  describe('findById', function(){
    it('should return a Todo with matching id', function(done){
      var priorityID = testPriority._id.toString();
      var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:priorityID});
      var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['two'], priority:priorityID});
      var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three'], priority:priorityID});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var id = t2._id.toString();
            Todo.findById(id, function(foundTodo){
              assert.deepEqual(foundTodo._id.toString(), id);
              assert.instanceOf(foundTodo, Todo);
              done();
            });
          });
        });
      });
    });
  });

  describe('findByComplete', function(){
    it('should return all Todos with isComplete === true', function(done){
      var priorityID = testPriority._id.toString();
      var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:priorityID, isComplete:true});
      var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['two'], priority:priorityID});
      var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three'], priority:priorityID});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByComplete(true, function(todos){
              assert.equal(todos[0].name, 'foo', 'the foo todo should have been returned');
              done();
            });
          });
        });
      });
    });
  });

  describe('findByPriority', function(){
    it('should return all Todos with a bullshit priority ID', function(done){
      var priorityID = testPriority._id.toString();
      var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:priorityID});
      var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['two'], priority:priorityID});
      var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three'], priority:'01234567890123456789abcd'});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByPriority('01234567890123456789abcd', function(todos){
              assert.equal(todos[0].name, 'baz', 'the baz todo should have been returned');
              done();
            });
          });
        });
      });
    });
  });

  describe('findByTag', function(){
    it('should return all Todos with a certain tag', function(done){
      var priorityID = testPriority._id.toString();
      var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:priorityID});
      var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['test', 'two'], priority:priorityID});
      var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three', 'test'], priority:priorityID});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            Todo.findByTag('test', function(todos){
              assert.lengthOf(todos, 2, 'should have gotten two todos back');
              assert.equal(todos[0].name, 'bar', 'bar should have been the first todo returned');
              assert.equal(todos[1].name, 'baz', 'baz should have been the second todo returned');
              done();
            });
          });
        });
      });
    });
  });

  describe('deleteById', function(){
    it('should delete a Todo with matching id', function(done){
      var priorityID = testPriority._id.toString();
      var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:priorityID});
      var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['two'], priority:priorityID});
      var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three'], priority:priorityID});
      t1.save(function(){
        t2.save(function(){
          t3.save(function(){
            var id = t2._id.toString();
            Todo.deleteById(id, function(){
              Todo.findAll(function(todos){
                assert.lengthOf(todos, 2, 'two todos should remain');
                assert.equal(todos[0].name, 'foo', 'foo should be left');
                assert.equal(todos[1].name, 'baz', 'baz should also be left');
                done();
              });
            });
          });
        });
      });
    });
  });

});
