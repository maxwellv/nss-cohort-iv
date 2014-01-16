
$(document).ready(initialize); //this command forces the browser to run

function initialize(){
  $("#calculate").click(calculate);
  $("#clear").click(clear);
  $("#multisum").click(multisum);
  $("#multiproduct").click(multiproduct);
  $("#multisumclear").click(multisumclear);
}

function calculate(){ //IMPORTANT: input elements use .val() to get value
  var num1 = $("#num1").val();
  num1 = parseFloat(num1);
  var num2 = $("#num2").val();
  num2 = parseFloat(num2);
  var oper = $("#oper").val();
  var result = compute(num1, oper, num2);
  $("#result").text(result);
}

function compute(number1, op, number2){
  var ret = 0;
  switch(op){
    case "+":
      ret = number1 + number2;
      break;
    case "-":
      ret = number1 - number2;
      break;
    case "*":
      ret = number1 * number2;
      break;
    case "/":
      ret = number1 / number2;
      break;
    default:
      ret = "you did something wrong";
      break;
  }
  return ret;
}

function clear(){
  $("#num1").val("");
  $("#oper").val("");
  $("#num2").val("");
  $("#result").text("");
  $("#num1").focus();
}

function multisum(){
 var multisum1 = isNaN(parseFloat($("#multisum1").val())) ? 0 : parseFloat($("#multisum1").val())
 var multisum2 = isNaN(parseFloat($("#multisum2").val())) ? 0 : parseFloat($("#multisum2").val())
 var multisum3 = isNaN(parseFloat($("#multisum3").val())) ? 0 : parseFloat($("#multisum3").val())
 var multisum4 = isNaN(parseFloat($("#multisum4").val())) ? 0 : parseFloat($("#multisum4").val())
 var multisum5 = isNaN(parseFloat($("#multisum5").val())) ? 0 : parseFloat($("#multisum5").val())
 $("#multisumresult").text(multisum1 + multisum2 + multisum3 + multisum4 + multisum5);
}


function multiproduct(){
 var multisum1 = isNaN(parseFloat($("#multisum1").val())) ? 1 : parseFloat($("#multisum1").val())
 var multisum2 = isNaN(parseFloat($("#multisum2").val())) ? 1 : parseFloat($("#multisum2").val())
 var multisum3 = isNaN(parseFloat($("#multisum3").val())) ? 1 : parseFloat($("#multisum3").val())
 var multisum4 = isNaN(parseFloat($("#multisum4").val())) ? 1 : parseFloat($("#multisum4").val())
 var multisum5 = isNaN(parseFloat($("#multisum5").val())) ? 1 : parseFloat($("#multisum5").val())
 $("#multisumresult").text(multisum1 * multisum2 * multisum3 * multisum4 * multisum5);
}

function newmultisum(){
  var s = 0;

  $(".multisum").each(function(index, element){
    s = s + parseFloat(element.value);
  //s = s + $(element).val();
    });
  console.log(s);
}

function temp(index, element){
  console.log("I am looping");
  console.log(index, element);
}

function multisumclear(){
  $("#multisum1").val("");
  $("#multisum2").val("");
  $("#multisum3").val("");
  $("#multisum4").val("");
  $("#multisum5").val("");
  $("#multisumresult").text("");
}



