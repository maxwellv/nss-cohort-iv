'use strict';

var isInitialized = false;
var mongoClient = require('./mongodb-connection-pool');

module.exports = function(req, res, next){
  if (!isInitialized){
    isInitialized = true;
    mongoClient(process.env.DBNAME, function(){
      next();
    });
  } else {
    next();
  }
};
