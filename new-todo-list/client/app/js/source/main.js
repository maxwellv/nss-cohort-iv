(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('.datepicker').fdatepicker();
    getAllData();
    $('#create-todo').click(createTodo);
    $('#create-priority').click(createPriority);
    $('#priorities').on('click', '.prioritybox', editPriority);
    $('#priorities').on('click', '.valuebox', editPriority);
    $('#priorities').on('click', '.save', saveEditedPriority);
    $('#priorities').on('click', '.delete', deletePriority);
    $('#previous').click(previousPage);
    $('#next').click(nextPage);
    $('#todos').on('change', 'input[type=checkbox]', checkboxToggled);
  }

  function checkboxToggled(){
    console.log('You clicked a checkbox. The checkbox now has a state of:', this.checked.toString());
    var id = $(this).parent().parent().attr('data-id');
    var url = createURL();
    url += '/todos/' + id + '/' + this.checked;
    url += '?callback=?';
    $.getJSON(url, function(result){console.log(result);});
  }

  function createTodo(){
    if (!$('#dueDate').val()){
      alert('Please enter a valid due date.');
      event.preventDefault();
      return;
    }
    var todoname = 'name=' + $('#todoname').val();
    var dueDate = '&dueDate=' + $('#dueDate').val();
    var id = '&priority=' + $('#priorityDropdown').val();
    var tags = '&tags=' + $('#tags').val();
    var data = todoname + dueDate + id + tags;
    var url = createURL();
    url += '/todos';
    var type = 'POST';
    $.ajax({url:url, data:data, type:type, success:function(todo){
      if (todo instanceof Error){
        alert(todo.message);
      } else {
        console.log('Added this todo to the DB: ', todo);
        todo = formatTodo(todo);
        $('#todos tbody').append(todo); //--we might not want to immediately append the new todo
       // instead re-run the current query/page settings/etc through the DB, and maybe the new todo will appear there
      }
    }
    });
    event.preventDefault();
  }

  var now = new Date();

  function formatTodo(todo){
    var $tr = $('<tr>');
    var $checkboxTh = $('<th>');
    var $checkbox = $('<input>');
    $checkbox.attr('type', 'checkbox');
    //$checkbox.checked = Boolean(todo.isComplete);
    $checkboxTh.append($checkbox);
    if (todo.isComplete === 'true'){
      $checkboxTh.children()[0].checked = true;
    } else { //it's only ever going to be true or false, but unfortunately it comes in as a string, so we have to convert it via this if statement
      $checkboxTh.children()[0].checked = false;
    }
    var $name = $('<th>');
    $name.text(todo.name);
    var $dueDate = $('<th>');
    var todoDate = new Date(todo.dueDate);
    $dueDate.text(todoDate.toString().substr(4, 11));
    if (now > todoDate && !Boolean(todo.isComplete)){ //if it's complete, we don't need to scare the user
      $dueDate.addClass('pastdue');
    }
    var $priority = $('<th>');
    $priority.text($('#priorities tbody tr[data-id="' + todo.priority + '"] th:first-child').text());
    var $tags = $('<th>');
    $tags.text(todo.tags.join(', '));
    $tr.append($checkboxTh, $name, $dueDate, $priority, $tags);
    $tr.attr('data-id', todo._id.toString());
    return $tr;
  }

  function editPriority(){
    if ($(this).children().length > 0){ //if it has kids, it already has text boxes
      return;
    }
    var other = $($(this).siblings()[0]);
    var functionbox = $($(this).siblings()[1]);
    var $input1 = $('<input>');
    $input1.attr('type', 'text');
    $input1.attr('name', 'name');
    $input1.val($(this).text());
    $(this).text('');
    $(this).append($input1);
    var $input2 = $('<input>');
    $input2.attr('type', 'text');
    $input2.attr('name', 'value');
    $input2.val(other.text());
    other.text('');
    other.append($input2);
    var $saveLink = $('<div>');
    $saveLink.addClass('save');
    $saveLink.text('save');
    functionbox.prepend($saveLink);
  }

  function saveEditedPriority(){
    var inputs = $(this).parent().siblings().children();
    var toReplace = $(this).parent().parent();
    var id = toReplace.attr('data-id');
    var data = 'name=' + inputs[0].value + '&value=' + inputs[1].value + '&_id=' + id;
    console.log(data);
    var url = createURL();
    url = url + '/priorities/' + id;
    var type = 'PUT';
    $.ajax({url:url, data:data, type:type, success:function(result){
      var editedPriority = formatPriority(result);
      toReplace.replaceWith(editedPriority);
      rebuildPriorityDropdown();
    }
    });
  }

  function deletePriority(){
    var toDelete = $(this).parent().parent();
    if (confirm('Are you sure you want to delete the "' + toDelete.children()[0].textContent + '" priority?')){
      var url = createURL();
      url += '/priorities/' + toDelete.attr('data-id');
      var type = 'DELETE';
      $.ajax({url:url, type:type, success:function(result){
        if (toDelete.attr('data-id') === result.id){
          toDelete.detach();
          rebuildPriorityDropdown();
        }
      }
      });
    }
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

  function rebuildPriorityDropdown(){ //TODO: make a smarter way of replacing options
    $('#priorityDropdown').empty();
    var priorities = $('#priorities tbody tr');
    for (var x = 0;x < priorities.length;x++){
      var id = $(priorities[x]).attr('data-id');
      var name = $(priorities[x]).children()[0].textContent;
      var $option = $('<option>');
      $option.text(name);
      $option.attr('value', id);
      $('#priorityDropdown').append($option);
    }
  }

  function getAllData(){
    getPriorities();
    var pagelength = $('#pagelength').val();
    var currentpage = $('#currentpage').val();
    getTodos('', pagelength * (currentpage - 1), pagelength);
  }

  function getTodos(query, skip, limit){
    $('#todos tbody').empty();
    var url = createURL();
    url = url + '/todos/';
    if (query === ''){
      query = null;
    }
    url = url + query + '/' + skip + '/' + limit;
    $.getJSON(url, displayTodos);
  }

  function displayTodos(todos){
    todos = todos.todos;
    for (var x = 0;x < todos.length;x++){
      var todoToDisplay = formatTodo(todos[x]);
      $('#todos tbody').append(todoToDisplay);
    }
  }

  function previousPage(){
    changePage(-1);
  }

  function nextPage(){
    changePage(1);
  }

  function changePage(change){
    var currentPage = parseInt($('#currentpage').val());
    if (currentPage === 1 && change === -1){return;}
    currentPage += change;
    $('#currentpage').val(currentPage);
    var pagelength = $('#pagelength').val();
    getTodos(currentQuery(), pagelength * (currentPage - 1), pagelength);
  }

  var currentquery = '';

  function currentQuery(){
    return currentquery;
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
    rebuildPriorityDropdown();
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
    var $deleteLink = $('<div>');
    $deleteLink.addClass('delete');
    $deleteLink.text('delete');
    $functions.append($deleteLink);
    $tr.append($priority, $value, $functions);
    $tr.attr('data-id', priority._id);
    return $tr;
  }

  function createURL(){
    return window.location.origin.replace(/[0-9]{4}/, '4000');
  }

})();

