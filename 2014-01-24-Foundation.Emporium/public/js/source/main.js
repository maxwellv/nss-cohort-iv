(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#add-item').click(addItem);
  }
  function addItem(event){
    var item = $('#item').val();
    event.preventDefault();
    var qty = $('#qty').val();
    var amount = $('#amount').val();
    var total = qty * amount;
    addItemToTable(item, qty, amount, total);
    updateTotal();
  }

  function addItemToTable(item, qty, amount, total){
    var tr = $('<tr>');
    var $item = $('<td>');
    $item.text(item);
    var $qty = $('<td>');
    $qty.text(qty);
    var $amount = $('<td>');
    $amount.text(numberToCurrency(amount));
    console.log(event);
    var $total = $('<td>');
    $total.text(numberToCurrency(total));
    tr.append($item, $qty, $amount, $total);
    $('table tbody').append(tr);
    

  }
  function numberToCurrency(number){
    number = parseFloat(number);
    number = number.toFixed(2);
    return '$' + number;
  }

  function updateTotal(){
    var $amounts = $('table > tbody > tr > td:nth-child(3)');
    var numbers = transformTDsToNumbers($amounts);
    var theSum = sum(numbers);
    $('table > tfoot > tr > td:nth-child(3)').text(numberToCurrency(theSum));
    var $totals = $('table > tbody > tr > td:nth-child(4)');
    numbers = transformTDsToNumbers($totals);
    theSum = sum(numbers);
    $('table > tfoot > tr > td:nth-child(4)').text(numberToCurrency(theSum));
  }

  function transformTDsToNumbers($tds){
    return $.map($tds, function(td){
      return parseFloat(td.textContent.slice(1));
    });
  }
  function sum(numbers){
    var total = 0;
    for (var x = 0; x < numbers.length;x++){
      total = total + numbers[x];
    }
    return total;
  }



})();
