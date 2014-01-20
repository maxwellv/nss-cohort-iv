
$(document).ready(initialize); 

function initialize(){
  $(".number").click(displayNumber);
  $("#push").click(push);
  $("#clear").click(clearBoth);
  $("#toggleNeg").click(toggleNeg);
  $(".operator").click(compute);
}


function compute(){
  //var operator = $(this).attr("id"); -- works for any attribute
  var operator = this.id;
  //Is it grayed out?
  if ($("#" + operator).css("color") === "rgb(204, 204, 204)")
    return;
  var $nums = $("#queue li");
  var result = null;
  var nums = parseTags($nums);
  switch(operator){
    case "add":
      result = nums[0] + nums[1];
      $("#answer").text(result);
      clearQueue();
      break;
    case "sub":
      result = nums[1] - nums[0];
      $("#answer").text(result);
      clearQueue();
      break;
    case "mul":
      result = nums[0] * nums[1];
      $("#answer").text(result);
      clearQueue();
      break;
    case "div":
      result = nums[1] / nums[0];
      $("#answer").text(result);
      clearQueue();
      break;
    case "pow":
      result = Math.pow(nums[1], nums[0]);
      $("#answer").text(result);
      clearQueue();
      break;
    case "sum":
      result = 0;
      for (var x = 0;x < nums.length;x++)
        result = result + nums[x];
      $("#answer").text(result);
      clearQueue();
      break;
    default:
      //if we get here then something wrong happened
  }
}

function changeOperatorColor(color, BGColor){
  var operators = ["add", "sub", "mul", "div", "pow"];
  for (var x in operators){
    $("#" + operators[x]).css("color", color);
    $("#" + operators[x]).css("background-color", BGColor);
  }
}

function displayNumber(){
  if (this.textContent === "." && containsChar($("#answer").text(), "."))
    return;
  if ($("#answer").text() && $("#answer").text() !== "0")
    $("#answer").text($("#answer").text() + this.textContent);
  else
    if (this.textContent === ".")
      $("#answer").text($("#answer").text() + this.textContent);
    else
      $("#answer").text(this.textContent);
}
function clearAnswer(){
  $("#answer").text("0");
}
function clearQueue(){
  $("#queue").empty(); //.empty() clears lists
  changeOperatorColor("#000000", "#ffffff");
}
function clearBoth(){
  clearAnswer();
  clearQueue();
}
function push(){
  var add = $("#answer").text();
  clearAnswer();
  var $li = $("<li>");
  $li.text(add);
  // li methods:
  // before: puts it before the ul
  // after: after the ul
  // prepend: at the top of the ul
  // append: at the bottom

  $("#queue").prepend($li);
  if ($("#queue li").length > 2)
    changeOperatorColor("#CCCCCC", "#999999"); 


  /*
  *  if ($("#queue").text() === "queue placeholder")
  *    $("#queue").text(add);
  *  else
  *    $("#queue").text($("#queue").text() + " " + add);
  */
    }
function toggleNeg(){
 /* if ($("#answer").text()[0] === "-")
    $("#answer").text($("#answer").text().substring(1, $("#answer").text().length));
  else
    $("#answer").text("-" + $("#answer").text()); */
  var x = $("#answer").text();
  x *= -1; //JavaScript plays very nice with this sort of thing
  $("#answer").text(x);
}
