(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#go').click(go);
  }

  function go(){
    var args = $('#data').val();
    args = args.split(';');
    var newArray = _.range(args[0], args[1], args[2]);
    console.log('Array: ', newArray);
    var shuffled = _.shuffle(newArray);
    console.log('Shuffled array: ', shuffled);
    var sampled = _.sample(newArray);
    console.log('Sample of array: ', sampled);
    var filtered = _.filter(newArray, function(x){
      return ((x % 3 === 0) && (x % 4 === 0));
    });
    console.log('Filtered array: ', filtered);
    var rejected = _.reject(newArray, function(x){
      return x % 2 === 0;
    });
    console.log('Rejected array: ', rejected);
    var mapped = _.map(newArray, function(x){
      return Math.sqrt(x);
    });
    console.log('Mapped array: ', mapped);
    var isEven = _.every(newArray, function(x){
      return x % 2 === 0;
    });
    console.log('Everything is even: ', isEven);
  }

})();
