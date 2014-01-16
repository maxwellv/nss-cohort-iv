
$(document).ready(initialize); 

function initialize(){
  $(".number").click(displayNumber);
}
function displayNumber(){
  if ($("#answer").text() && $("#answer").text() !== "0")
    $("#answer").text($("#answer").text() + this.textContent)
  else
    $("#answer").text(this.textContent);
}



