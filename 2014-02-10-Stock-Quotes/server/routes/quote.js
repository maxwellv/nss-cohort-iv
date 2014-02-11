'use strict';

var Stock = require('./lib/stock');

exports.getQuote = function(req, res){
  console.log('This is the stock creation method');
  console.log(req.query);
  var result = new Stock(req.query.symbol);
  res.jsonp(result);
};
