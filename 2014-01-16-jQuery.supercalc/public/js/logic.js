function containsChar(word, letter){
  if (word.indexOf(letter) === -1)
    return false;
  else
    return true;
}
function parseTags($tags){
  return $.map($tags, function(tag){ //.map() takes an array and runs a function
    return parseFloat(tag.textContent);             // on each element
     });
}
