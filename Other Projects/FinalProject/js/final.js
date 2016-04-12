$(document).ready(function() {

  //get all the nav li, add click event
  $(".nav").find("li").on("click", function() {
      $("#pageContent").hide().html("");
      //remove all active class
      $(".nav").find("li").removeClass("active");
      //add active class to clicked li
      $(this).addClass("active");

      //get the correct page according to click
      var page = $(this).attr("id");
      getPartial(page);


    }) //click

  //get the partial via JSON, add to page
  function getPartial(partial) {

    if (partial == "homePage") { //ajax get home.html
      $.get("partials/home.html", function(data) {
        $("#pageContent").html(data);
        $('.carousel').carousel();
      })
    } else if (partial == "seeCarsPage") { //ajax models.html

      $.getJSON("jsonDatabase/final.json", function(data) {

          var html = "";

          $.each(data, function(index, item) {
              html += '<div class="col-md-4">' +
                '<div class="carType">' + item.type + '</div>' + //name of the car
                '<div class="carStyle"> <small> Style </small>' + item.style + '</div>' + //style of the car
                '<div class="carYear"> <small> Year </small>' + item.year + '</div>' + //year of the car
                '<img class="carImage" src="' + item.image + '"/>' + //image of the car

                '<div class="panel panel-default">' + //surrounding panel
                '<div class="panel-heading">Renter Comments</div>'; //surrounding panel for renter comments
              $.each(item.comments, function(ind, i) {
                  html += '<div class="panel-body">' +
                    '<div class="renterName">' + i.username + '</div>' + //renter username
                    '<div class="renterComment">' + i.comment + '</div>' + //the comment
                    '<div class="renterStars">'; //the rating the user gives

                  for (var j = 1; j <= 5; j++) {

                    if (j <= i.stars) {
                      html += '<img class="stars" alt src="images/fullStar.png"/>';
                    } else {
                      html += '<img class="stars alt "src="images/emptyStar.png"/>';
                    }
                  }
                  html += '</div>' + //end stars
                    '</div>'; //panel body
                }) //each comment

              html += '</div>' + //panel
                '</div>'; //col-md-4

            });

          $("#pageContent").append(html);

        }) //getJSON
    } else if (partial == "orderPage") { //ajax get order.html
      $.get("partials/order.html", function(data) {

          $("#pageContent").html(data);

          $('#startRentDate, #endRentDate').datepicker({});

          $("#submitButton").on("click", function() {

              //get all empty inputs and select
              //add error class to div container
              $("input, select").filter(function() {
                return !this.value;
              }).closest("div").addClass("has-error");

              //remove error class for non empty ones
              $("input, select").filter(function() {
                return this.value; //removed !
              }).closest("div").removeClass("has-error");

              var errors = $(".has-error");

              if (errors.length < 1) {
                //alert("no errors");
                sendConfirmation();
              }

            }) //click
        }) //get
    } else { //ajax get contact.html
      $.get("partials/contact.html", function(data){
          $("#pageContent").html(data);
          $('.carousel').carousel();

          $("#submitButton").on("click", function() {
            alert("Thank You for your message. We will contact you shortly.");
            {
                //alert("no errors");
                sendConfirmation();
              }

            })

      })
  }


    $("#pageContent").fadeIn();

  }

  function sendConfirmation() {
    //make an object to record data for database;
    var order = {};
    //get all the jquery objects
    var formData = $("input, select");
    //for each jquery object
    formData.each(function() {
      var id = $(this).attr("id"); //get the id of the element
      order[id] = $(this).val(); //set the field and the value
    })

    alert("Order Processing...");
    alert(JSON.stringify(order));
    $("#successMsg").html("Thank You, your request for your order has been received!");

  } //sendConfirmation

  //begin the program, get the homepage
  getPartial("homePage");



})
