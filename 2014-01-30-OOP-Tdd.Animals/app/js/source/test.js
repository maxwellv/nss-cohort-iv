/* global test:false, deepEqual:false, Shelter:false */

'use strict';

test('add', function(){
  deepEqual( 1 === 1, true, 'Passed!');
});
test('Shelter', function(){
  var shelter = new Shelter();
  var s1 = new Shelter();
  var string = 'my string';
  deepEqual(shelter instanceof Shelter, true, 'shelter should be an instance of Shelter');
  deepEqual(s1 instanceof Shelter, true, 's1 should be an instance of Shelter');
  deepEqual(!(string instanceof Shelter), true, 'string should not an instance of Shelter');
});

test('Shelter Name', function(){
  var s1 = new Shelter('Animal Shelter');
  deepEqual(s1.name === 'Animal Shelter', true, 's1.name should be \'Animal Shelter\'');
});
test('Shelter Location', function(){
  var s2 = new Shelter('Animal Shelter');
  deepEqual(s2.location === 'not defined', true, 's2\'s location should be not defined');
});
test('Shelter Capacity', function(){
  var s3 = new Shelter('Animal Shelter');
  deepEqual(s3.capacity === 0, true, 's3\'s capacity should be 0');
});
test('Shelter Hours', function(){
  var s4 = new Shelter('Animal Shelter');
  s4.setHours([
    {day: 'Monday', open: '8 AM', close: '5 PM'},
    {day: 'Wednesday', open: '11 AM', close: '2 PM'},
    {day: 'Friday', open: '9 AM', close: '4 PM'}
  ]);
  deepEqual(s4.hours, 'Monday: 8 AM - 5 PM, Wednesday: 11 AM - 2 PM, Friday: 9 AM - 4 PM', 's4\'s hours should be all that crap up there');
});
