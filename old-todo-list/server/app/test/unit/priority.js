/* jshint expr:true */
'use strict';

var assert = require('chai').assert;
var Priority;

describe('Priority', function(){

  before(function(done){
    var connect = require('../../lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('priorities').drop();
    done();
  });

  describe('new', function(){
    it('should create a new priority', function(){
      var obj = {name: 'High', value: '10'};
      var p1 = new Priority(obj);
      assert.instanceOf(p1, Priority, 'p1 should be an instance of Priority');
      assert.property(p1, 'name', 'p1 should have a property called name');
      assert.deepEqual(p1.name, 'High', 'p1 should have a name of High');
      assert.property(p1, 'value', 'p1 should have a property called value');
      assert.deepEqual(p1.value, 10, 'p1 should have a value of 10');
    });
  });

  describe('save', function(){
    
    it('should save a priority object into the DB', function(done){
      var obj = {name: 'High', value: '10'};
      var p1 = new Priority(obj);
      p1.save(function(savedPriority){
        assert.instanceOf(savedPriority, Priority, 'the savedPriority should be a plain object, not a Priority');
        assert.property(savedPriority, '_id', 'the savedPriority should have an _id');
        assert.ok(savedPriority._id, 'the _id should be a truthy value');
        done();
      });
    });
    
    it('should not create duplicate priorities based on the name', function(done){
      var p1 = new Priority({name: 'High', value: '10'});
      var p2 = new Priority({name: 'Medium', value: '5'});
      var p3 = new Priority({name: 'High', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              assert.lengthOf(priorities, 2, 'there should be two priorities, since p3 has a duplicate name');
              done();
            });
          });
        });
      });
    });
  });

  describe('findAll', function(){
    it('should find all priorities in the DB', function(done){
      var p1 = new Priority({name: 'High', value: '10'});
      var p2 = new Priority({name: 'Medium', value: '5'});
      var p3 = new Priority({name: 'Low', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              assert.lengthOf(priorities, 3, 'there should be three priorities');
              done();
            });
          });
        });
      });
    });
  });

  describe('findByName', function(){
    it('should find one priority in the DB by name', function(done){
      var p1 = new Priority({name: 'High', value: '10'});
      var p2 = new Priority({name: 'Medium', value: '5'});
      var p3 = new Priority({name: 'Low', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('High', function(priorities){
              assert.typeOf(priorities, 'array', 'findByName should have given us an array');
              assert.lengthOf(priorities, 1, 'only one entry in the DB should match the High name');
              assert.deepEqual(priorities[0].name, 'High', 'the returned Priority should be named High');
              done();
            });
          });
        });
      });
    });
  });

  describe('findByID', function(){
    it('should find one priority in the DB by ID', function(done){
      var p1 = new Priority({name: 'High', value: '10'});
      var p2 = new Priority({name: 'Medium', value: '5'});
      var p3 = new Priority({name: 'Low', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByID(p3._id.toString(), function(priorities){
              assert.typeOf(priorities, 'object', 'findByID should have returned a single object');
              assert.instanceOf(priorities, Priority, 'findByID should have returned an instance of Priority');
              assert.deepEqual(p3._id, priorities._id, 'findByID should have returned p3');
              done();
            });
          });
        });
      });
    });
  });
  describe('findByName', function(){
    it('should find one priority in the DB by name', function(done){
      var p1 = new Priority({name: 'High', value: '10'});
      var p2 = new Priority({name: 'Medium', value: '5'});
      var p3 = new Priority({name: 'Low', value: '1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('High', function(priorities){
              assert.typeOf(priorities, 'array', 'findByName should have given us an array');
              assert.lengthOf(priorities, 1, 'only one entry in the DB should match the High name');
              assert.deepEqual(priorities[0].name, 'High', 'the returned Priority should be named High');
              done();
            });
          });
        });
      });
    });
  });

});
