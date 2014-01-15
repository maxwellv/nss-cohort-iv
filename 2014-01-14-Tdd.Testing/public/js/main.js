/*
test("name of test", function() {
  deepEqual(actual, expected, "my test message");
});
*/
function add(x, y){
  return x + y;
  }

function sum(x){
  var result = 0;
  for (var count = 0;count < x.length;count++){
    result = result + x[count];
  }
  return result;
}

function countEvens(x){
  var result = 0;
  for (var count = 0;count < x.length;count++){
    if (x[count] % 2 === 0)
      result++;
  }
  return result;
}

function makeEvenStringsUppercase(x){
  var ret = [];
  for (var count = 0;count < x.length;count++){
    if (x[count].length % 2 === 0)
      ret.push(x[count].toUpperCase());
    else
      ret.push(x[count].toLowerCase());
  }
  return ret;
}

function sumLengthOfStrings(x){
  var ret = 0;
  for (var count = 0;count < x.length;count++){
    if (x[count] != " ")
      ret++;
  } return ret;
}

function makeCatWithName(x){
  var newCat = {name: x};
  return newCat;
}

