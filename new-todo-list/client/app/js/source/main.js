(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    getAllData();
    $('#create-todo').click(createTodo);
    $('#create-priority').click(createPriority);
  }

  function createTodo(){
    alert('create todo was clicked');
    event.preventDefault();
  }

  function createPriority(){
    var data = $(this).parent().serialize();
    console.log('Data:', data);
    var url = createURL();
    url = url + '/priorities';
    var type = 'POST';
    $.ajax({url:url, data:data, type:type, success:function(result){
      if (typeof result === 'string'){ //did it get an error?
        alert(result);
      } else {
        result = formatPriority(result);
        $('#priorities tbody').append(result);
      }
    }
    });
    event.preventDefault();
  }

  function getAllData(){
    getPriorities();
  }

  function getPriorities(){
    var url = createURL();
    url = url + '/priorities';
    $.getJSON(url, displayPriorities);
  }

  function displayPriorities(priorities){
    priorities = priorities.priorities;
    for (var x = 0;x < priorities.length;x++){
      var priorityToDisplay = formatPriority(priorities[x]);
      $('#priorities tbody').append(priorityToDisplay);
    }
  }

  function formatPriority(priority){
    var $tr = $('<tr>');
    var $priority = $('<th>');
    $priority.addClass('prioritybox');
    $priority.text(priority.name);
    var $value = $('<th>');
    $value.addClass('valuebox');
    $value.text(priority.value);
    var $functions = $('<th>');
    $functions.attr('id', 'functionsbox-' + priority._id);
    var $editLink = $('<div>');
    $editLink.addClass('edit');
    $editLink.text('edit');
    $functions.append($editLink);
    $tr.append($priority, $value, $functions);
    $tr.attr('data-id', priority._id);
    return $tr;
  }

  function createURL(){
    return window.location.origin.replace(/[0-9]{4}/, '4000');
  }

})();

