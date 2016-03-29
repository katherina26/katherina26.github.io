$(document).ready(function() {

  $.getJSON("JSONdatabase/Cars.json", function(data) { //pulls the arrays from the database

    console.dir(data);
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

            for (var j = 1; j <= 5; j++) { //user can rate from 1-5

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
      }) //each car

    $("#carData").append(html);
  })
})
