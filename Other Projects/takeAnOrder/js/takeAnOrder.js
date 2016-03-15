$(document).ready(function() {
  /*
  - click- done
  - focus
  - blur
  - change
  - mouseenter & mouseleave
  $("#").on("", function() {

  });
  */
  //change button text when hovering/clicking over it
  $("#myButton").on("mouseenter", function() {
      $("#log").append("<br>Button mouseenter");
      $(this).text("ORDER NOW!");
    })
    .on("mouseleave", function() {
      $("#log").append("<br>Button mouseleave");
      $(this).text("Click Me!");
    });


  //change the backgrund color on focus, blue
  $("#mySingleLineText").on("focus", function() {
      $("#log").append("<br>input focus");
      $(this).css("background-color", "#F7F8E0");
    })
    .on("blur", function() {
      $("#log").append("<br>input blur");
      $(this).css("background-color", "#FFF");
    });

  //give the user a message about their selection
  $("#mySelect").on("change", function() {

    var val = $(this).val();
    $("#log").append("<br>select change");
    $("#mySelectMessage").html(val + " is a nice selection!");

  });

  //user clicks the button
  $("#myButton").on("click", function() {

    $("#log").append("<br>User clicked the button");

    var userOrder = {};

    userOrder.myInput = $("#mySingleLineText").val();
    userOrder.myTextarea = $("#myTextarea").val();
    userOrder.mySelect = $("#mySelect").val();
    userOrder.myRadio = $("[name='size']:checked").val();
    userOrder.myCheckValues = [];

    $("[name='vehicle']:checked").each(function() {
      userOrder.myCheckValues.push($(this).val());
    });

    $("#log").append("<br>Value of input is: " + userOrder.myInput);
    $("#log").append("<br>Value of textarea is: " + userOrder.myTextarea);
    $("#log").append("<br>Value of select is: " + userOrder.mySelect);
    $("#log").append("<br>Value of radio button is: " + userOrder.myRadio);
    $("#log").append("<br>Value of checks is: " + userOrder.myCheckValues.join());
    $("#log").append("<br><br>Value of userOrder is: " + JSON.stringify(userOrder));

    /*
        var myInput = $("#mySingleLineText").val();
        var myTextarea = $("#myTextarea").val();
        var mySelect = $("#mySelect").val();
        var myRadio = $("[name='gender']:checked").val();

        var myCheckValues = [];

        //each is a jquery loop for objects/arrays
        //each thing that is selected, do the function
        //"this" is the element we are currently looking at
        $("[name='vehicle']:checked").each(function() {
          myCheckValues.push($(this).val());
        });

        $("#log").append("<br>User clicked the button");

        $("#log").append("<br>Value of input is: " + myInput);
        $("#log").append("<br>Value of textarea is: " + myTextarea);
        $("#log").append("<br>Value of select is: " + mySelect);
        $("#log").append("<br>Value of radio button is: " + myRadio);
        $("#log").append("<br>Value of checks is: " + myCheckValues.join());
    */
  })


});
