
$(document).ready(initialize);

function initialize(){
  $("#add-color").click(addColor);
  $("#add-pixels").click(addPixels);
  $("#add-background").click(addBackground);
  //dynamically generated elements require .on
  $("#colors").on("click", ".color", selectColor);
  $("#pixels").on("mouseover", ".pixel", colorPixel);
}
function addColor(){
  //alert("hello world");
  var color = $("#color-text").val();
  var $div = $("<div>");
  $div.addClass("color");
  $div.css("background-color", color);
  $("#colors").prepend($div);
}
function selectColor(){
  // alert("hello world");
  if ($(this).hasClass("selected"))
    $(this).removeClass("selected");
  else{
    $(".color").removeClass("selected");
    $(this).addClass("selected");
  }
}

function addPixels(){
  var num = $("#number-text").val();
  num = parseInt(num);
  for(var i = 0;i < num;i++){
    var $pixel = $("<div>");
    $pixel.addClass("pixel");
    $("#pixels").prepend($pixel);
  }
}

function addBackground(){
  var bg = $("#background-url").val();
  $("#pixels").css("background", "url(" + bg + ") repeat");
}

function colorPixel(){
  var color = $(".selected").css("background-color");
  $(this).css("background-color", color);
}
