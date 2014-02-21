/* jshint expr:true */
'use strict';

var expect = require('chai').expect;
//var Priority = require('../../app/models/priority');
var Priority;
describe('Priority', function(){

  before(function(done){
    var connect = require('../../app/lib/mongodb-connection-pool');
    connect('todo-test', function(){
      Priority = global.nss.Priority;
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Priority', function(){
      var obj = {name:'High', value:'10'};
      var p1 = new Priority(obj);

      expect(p1).to.be.instanceof(Priority);
      expect(p1).to.have.property('name').and.equal('High');
      expect(p1).to.have.property('value').and.deep.equal(10);
    });
  });

  describe('#save', function(){
    it('should save a Priority object into the database', function(done){
      var obj = {name:'High', value:'10'};
      var p1 = new Priority(obj);
      p1.save(function(err, savedPriority){
        expect(savedPriority).to.be.instanceof(Priority);
        expect(savedPriority).to.have.property('_id').and.be.ok;
        done();
      });
    });
  });

  it('should not create duplicate priorities based on name', function(done){
    var p1 = new Priority({name:'High', value:'10'});
    var p2 = new Priority({name:'Medium', value:'5'});
    var p3 = new Priority({name:'High', value:'1'});
    p1.save(function(){
      p2.save(function(){
        p3.save(function(err){
          expect(err).to.be.an.instanceof(Error);
          done();
        });
      });
    });
  });

  it('should update an existing priority', function(done){
    var p1 = new Priority({name:'High', value:'19'});
    p1.save(function(){
      p1.name = 'High';
      p1.value = 10;
      var oldId = p1._id.toString();
      p1.save(function(){
        Priority.findById(oldId, function(priority){
          expect(priority.name).to.equal('High');
          expect(priority.value).to.deep.equal(10);
          done();
        });
      });
    });
  });


  describe('.findAll', function(){
    it('should return all Priorities in the database', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findAll(function(priorities){
              expect(priorities).to.have.length(3);
              done();
            });
          });
        });
      });
    });
  });

  describe('.findByName', function(){
    it('should return a Priority with matching name', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.findByName('High', function(foundPriority){
              expect(foundPriority).to.have.property('name').and.equal('High');
              expect(foundPriority).to.be.a('Object');
              done();
            });
          });
        });
      });
    });
  });

  describe('.findById', function(){
    it('should return a Priority with matching id', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});

      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            debugger;
            var id = p2._id.toString();
            Priority.findById(id, function(foundPriority){
              foundPriority = new Priority(foundPriority);
              expect(p2._id.toString()).to.equal(id);
              expect(foundPriority).to.be.instanceof(Priority);
              done();
            });
          });
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete priority with matching ID.', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      var p2 = new Priority({name:'Medium', value:'5'});
      var p3 = new Priority({name:'Low', value:'1'});
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            var id = p1._id.toString();
            Priority.deleteById(id, function(deletedCount){
              expect(deletedCount).to.equal(1);
              done();
            });
          });
        });
      });
    });
  });


/*
  describe('.update', function(){
    it('should update a priority and return the updated priority values.', function(done){
      var p1 = new Priority({name:'High', value:'10'});
      p1.save(function(){
        p1.update({value: '15'}, function(updatedPriority){
          expect(p1).to.have.property('value', 15);
        });
      });
    });
  });
  */


});
