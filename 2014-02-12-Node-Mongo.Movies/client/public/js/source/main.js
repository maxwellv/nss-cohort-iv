(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#movie').submit(submitMovie);
    $('#get-movies').click(getMovies);
    $('#movies').on('click', '.delete', deleteMovie);
    $('#movies').on('click', '.edit', scrapeMovieData);
  }

  function scrapeMovieData(){
    alert('edit movie was clicked');
    var toEdit = $(this).parent();
    $('#name').val(toEdit.attr('data-name'));
    var sibs = $(toEdit).siblings();
    console.log(sibs);
    for (var x = 0;x < sibs.length;x++){
      switch (sibs[x].className){
        case 'rating':
          $('#rating').val(sibs[x].textContent);
          break;
        case 'runningTime':
          $('#runningTime').val(sibs[x].textContent);
          break;
        case 'releaseYear':
          $('#releaseYear').val(sibs[x].textContent);
          break;
        case 'studio':
          $('#studio').val(sibs[x].textContent);
          break;
        case 'actors':
          $('#actors').val(sibs[x].textContent);
          break;
        case 'director':
          $('#director').val(sibs[x].textContent);
          break;
        case 'poster':
          $('#poster').val($(sibs[x]).attr('src'));
          break;
      }
    }
    $('#_id').val(toEdit.parent().attr('data-id'));
  }

  var deleteID, selectedMovie;

  function deleteMovie(){
    selectedMovie = $(this).parent().parent();
    if (confirm('Are you sure you want to delete ' + $(this).parent().attr('data-name') + '?')){
      deleteID = selectedMovie.attr('data-id');
      console.log(deleteID);
      var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/movies';
      url += '/' + deleteID;
      var type = 'DELETE';
      var ajaxRequest = $.ajax({url:url, type:type, success:maybeRemoveMovie});
      ajaxRequest.fail(function(){
        alert('Something went horribly wrong with your request to the server.');
      });
    }
  }

  function maybeRemoveMovie(movie){
    console.log('maybeRemoveMovie got this movie:');
    console.log(movie);
    if (deleteID === movie.movies[0]._id){
      $(selectedMovie).detach();
    } else { //this probably won't get called, but I put it in as a contigency
      alert('It looks like your request was incorrect, somehow.');
    }
  }

  function getMovies(){
    //alert('Get movies was clicked');
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/movies';
    $.getJSON(url, displayMovies);
  }

  function displayMovies(movies){
    movies = movies.movies;
    if (!movies){
      alert('No movies to display!');
      return;
    }
    $('#movies tbody').empty();
    for (var x in movies){
      var movieToDisplay = formatMovieForDisplay(movies[x]);
      $('#movies tbody').append(movieToDisplay);
    }
  }

  function formatMovieForDisplay(movie){
    console.log('Formatting this movie: ', movie);
    var $tr = $('<tr>');
    var $name = $('<th>');
    $name.text(movie.name);
    $name.attr('data-name', movie.name);
    var $deleteLink = $('<div>');
    $deleteLink.addClass('delete');
    $deleteLink.text('(delete)');
    var $editLink = $('<div>');
    $editLink.addClass('edit');
    $editLink.text('(edit)');
    $name.append($editLink, $deleteLink);
    var $rating = $('<th>');
    $rating.text(movie.rating);
    $rating.addClass('rating');
    var $runningTime = $('<th>');
    $runningTime.text(movie.runningTime);
    $runningTime.addClass('runningTime');
    var $releaseYear = $('<th>');
    $releaseYear.text(movie.releaseYear);
    $releaseYear.addClass('releaseYear');
    var $studio = $('<th>');
    $studio.text(movie.studio);
    $studio.addClass('studio');
    var $actors = $('<th>');
    $actors.text(movie.actors.join(', '));
    $actors.addClass('actors');
    var $director = $('<th>');
    $director.text(movie.director);
    $director.addClass('director');
    var $poster = $('<img>');
    $poster.addClass('poster');
    $poster.attr('src', movie.poster);
    $tr.append($name, $rating, $runningTime, $releaseYear, $studio, $actors, $director, $poster);
    $tr.attr('data-id', movie._id);
    return $tr;
  }

  function submitMovie(event){
    alert('Submit movie was clicked');
    var data = $(this).serialize();
    var url = window.location.origin.replace(/[0-9]{4}/, '4000') + '/movies';
    var id = $('#_id').val();
    var type, success;
    if (id  === ''){ //if the id input is empty then we are adding a new movie...
      type = 'POST';
      success = newMovie;
    } else { //...else, we're editing an existing movie
      data = data + '&_id=' + id;
      type = 'PUT';
      success = updatedMovie;
      $('input').val(''); //clear all inputs, including the hidden id input
    }
    $.ajax({url:url, data:data, type:type, success:success});
    event.preventDefault();
  }

  function updatedMovie(movie){
    console.log('Updated movie:');
    var replaceID = movie._id;
    movie = formatMovieForDisplay(movie);
    console.log(movie);
    var movieToReplace = $('tr[data-id=\"' + replaceID + '\"]');
    console.log(movieToReplace);
    movieToReplace.replaceWith(movie);
  }

  function newMovie(movie){
    console.log('New movie:');
    console.log(movie);
    movie = formatMovieForDisplay(movie);
    $('#movies tbody').append(movie);
  }

})();

