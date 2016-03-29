$(document).ready(function(){


$(".nav").find("li").removeClass("active");
//add active class to clicked li
$(this).addClass("active");

var page = $(this).attr("id");
getPartial(page);

})//click

function getPartial(partial) {

if (partial == "homePage") {
  $.get("partials/home.html", function(data){
    $("#pageContent").html(data);
    $('.carousel').carousel();

  })

} else if (partial == "seeCatsPage") {

} else if (partial == "orderPage") {
  $.get("partials/order.html", function(data){
    $("#pageContent").html(data);
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

    //give the user a message about their selection for each dress
    $("#mySelect").on("change", function() {

      var val = $(this).val();
      $("#log").append("<br>select change");
      alert("That dress is hot!");

    });


    //user clicks the button
    $("#myButton").on("click", function() {

      $("#log").append("<br>User clicked the button");

      var userOrder = {};

      userOrder.myInput = $("#mySingleLineText").val();
      userOrder.myTextarea = $("#myTextarea").val();
      userOrder.mySelect = $("#mySelect").val();
      userOrder.myRadio = $("[name='size']:checked").val();
      userOrder.myCheckValues = $("[name='color']:checked").val();

      $("[name='vehicle']:checked").each(function() {
        userOrder.myCheckValues.push($(this).val());
      });
      //what is shown to the user for their order
      $("#log").append("<br>Name: " + userOrder.myInput);
      $("#log").append("<br>Address and Contact: " + userOrder.myTextarea);
      $("#log").append("<br>Amount: " + userOrder.mySelect);
      $("#log").append("<br>Size: " + userOrder.myRadio);
      $("#log").append("<br>Colour: " + userOrder.myCheckValues.join());
      $("#log").append("<br><br>Value of userOrder is: " + JSON.stringify(userOrder));


    })
}


//begin program to get homepage
getPartial("homePage");
)}
