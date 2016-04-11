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

        //get the parital via JSON, add to page, activiate associating js
        function getPartial(partial) {

            if (partial == "homePage") { //ajax get home.html
                $.get("partials/home.html", function(data) {
                    $("#pageContent").html(data);
                    $('.carousel').carousel();
                })
            } else if (partial == "seeDressPage") { //ajax models.html
                //paste the getJSON here; change the append id; change the file name
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
                                                html += '<img src="images/fullStar.png"/>';
                                            } else {
                                                html += '<img src="images/emptyStar.png"/>';
                                            }
                                        }
                                        html += '</div>' + //end stars
                                            '</div>'; //panel body
                                    }) //each comment

                                html += '</div>' + //panel
                                    '</div>'; //col-md-4
                            }) //each dress

                        $("#pageContent").html(html);

                    }) //getJSON
            } else if (partial == "orderPage") { //ajax get order.html
                $.get("partials/order.html", function(data) {

                        $("#pageContent").html(data);


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
            }
            $("#pageContent").fadeIn();

        }

        function sendConfirmation() {
            //make an object to record data for database;
            var order = {};
            //get all teh jquery objects
            var formData = $("input, select");
            //for each jquery object
            formData.each(function() {
                var id = $(this).attr("id");//get the id of the element
                order[id] = $(this).val();//set the field and the value
            })

            alert("Sending to database " + JSON.stringify(order));
            $("#successMsg").html("Order Received!<br/><br/>" +
              order.dressSelect + " will be delivered on " +
              order.startRentDate +
              "<img id='paws' src='images/catPaws.jpeg'>");

        } //sendConfirmation

        //begin the program, get the homepage
        getPartial("homePage");

    }) //ready
    /*
                //activate the datepicker
                $('#startRentDate, #endRentDate').datepicker({});

                //user clicks submit
                $("#submitButton").on("click", function() {

                  //add the error class to div of empty inputs
                  $("input, select").filter(function() {
                    return !this.value;
                  }).closest("div").addClass("has-error")

                  //remove the error class from all filled inputs
                  $("input, select").filter(function() {
                    return this.value;
                  }).closest("div").removeClass("has-error");

                  //get all errors
                  var hasError = $(".has-error");

                  //if no errors
                  if (hasError.length < 1) {
                    sendConfirmation();
                  }

                })


                //do when order valid
                function sendConfirmation() {

                  //we will store all our order information here
                  var order = {};

                  //get all input values
                  var inputs = $("input, select");

                  //put all the input values into object ; this each can be done with jquery objects
                  inputs.each(function() {
                    var id = $(this).attr("id");
                    order[id] = $(this).val();
                  })

                  //act as if sending to databse
                  alert("send to databse: " + JSON.stringify(order));

                  //show success message
                  $("#successMsg").html("Order Received!<br/><br/>" +
                    order.catSelect + " will be delivered on " + order.startRentDate + "<img id='paws' src='images/catPaws.jpeg'>");
                }//end sendConfirmation
    */
