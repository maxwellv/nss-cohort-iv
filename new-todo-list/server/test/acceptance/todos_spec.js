/* jshint expr:true */
'use strict';

process.env.DBNAME = 'todo-test';
var app = require('../../app/app');
var request = require('supertest');
var assert = require('chai').assert;
var Priority, Todo;

describe('todos', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Priority = global.nss.Priority;
      Todo = global.nss.Todo;
      done();
    });
  });

  beforeEach(function(done){
    var p1 = new Priority({name: 'High', value: '10'});
    var p2 = new Priority({name: 'Medium', value: '5'});
    var p3 = new Priority({name: 'Low', value: '1'});
    p1.save(function(err, ret){
      console.log(ret);
      var p1ID = ret._id.toString();
      p2.save(function(err, ret){
        var p2ID = ret._id.toString();
        p3.save(function(err, ret){
          var p3ID = ret._id.toString();
          var t1 = new Todo({name:'foo', dueDate: new Date(), tags: ['one'], priority:p1ID});
          var t2 = new Todo({name:'bar', dueDate: new Date(), tags: ['two'], priority:p2ID});
          var t3 = new Todo({name:'baz', dueDate: new Date(), tags: ['three'], priority:p3ID});
          t1.save(function(){
            t2.save(function(){
              t3.save(function(){
                done();
              });
            });
          });
        });
      });
    });
  });

  afterEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('GET /todos', function(){
    it('should return all the todos in the database', function(done){
      request(app).get('/todos').end(function(err, res){
        var todos = res.body.todos;
        assert.lengthOf(todos, 3, 'there should be 3 todos in the DB');
        assert.equal(todos[0].name, 'foo', 'the first todo should be named foo');
        assert.lengthOf(todos[0].priority, 24, 'foo should have a priority ID');
        done();
      });
    });
  });

  describe('POST /todos', function(){
    it('should create a new Todo', function(done){
      var newTodo = {name:'new todo', dueDate: new Date(), tags: ['four'], priority:'12345678901234567890abcd'};
      request(app).post('/todos').send(newTodo).end(function(err, res){
        assert.equal(res.body.name, 'new todo', 'the new todo should have a name of new todo');
        assert.deepEqual(res.body.tags, ['four'], 'the new todo should have a tag of four');
        assert.deepEqual(res.body.priority, '12345678901234567890abcd', 'the new todo should have that bullshit priority ID');
        done();
      });
    });
  });

  describe('GET /todos/id', function(){
    it('should return 1 todo with matching ID', function(done){
      Todo.findByName('foo', function(todo){
        request(app).get('/todos/' + todo._id).end(function(err, res){
          assert.equal(res.body.name, 'foo', 'the returned todo should have been foo');
          assert.deepEqual(res.body.tags, ['one'], 'the returned todo should have a tag of one');
          assert.lengthOf(res.body.priority, 24, 'the returned todo should have a priority ID');
          done();
        });
      });
    });
  });

  describe('DELETE /todos', function(){
    it('should delete a specific todo from the database', function(done){
      Todo.findByName('bar', function(todo){
        request(app).del('/todos/' + todo._id.toString()).end(function(err, res){
          Todo.findAll(function(todos){
            assert.deepEqual(res.body.count, 1, 'one todo should have been deleted');
            assert.lengthOf(todos, 2, 'there should be two todos remaining');
            assert.equal(todos[0].name, 'foo', 'foo should be left behind');
            assert.equal(todos[1].name, 'baz', 'baz should also be left');
            done();
          });
        });
      });
    });
  });

});
