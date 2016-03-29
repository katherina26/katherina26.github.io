$(document).ready(function() {

    $.getJSON("JSONdatabase/Cars.json", function(data) {

      console.dir(data);
      var html = "";

      $.each(data, function(index, item) {
          html += '<div class="col-md-4">' +
            '<div class="carName">' + item.name + '</div>' +
            '<div class="carType"> <small> type </small>' + item.type + '</div>' +
            '<div class="carStyle"> <small> style </small>' + item.style + '</div>' +
            '<div class="carYear"> <small> year </small>' + item.year + '</div>' +
            '<img class="carImage" src="' + item.image + '"/>' +

          '<div class="panel panel-default">' + //surrounding panel
            '<div class="panel-heading">Renter Comments</div>'; //surrounding panel for renter comments
          $.each(item.comments, function(ind, i) {
              html += '<div class="panel-body">' + //added
                '<div class="renterName">' + i.username + '</div>' +
                '<div class="renterComment">' + i.comment + '</div>' +
                '<div class="renterStars">';

              for (var j = 1; j <= 5; j++) {

                if (j <= i.stars) {
                  html += '<img src="images/fullStar.png"/>';
                } else {
                  html += '<img src="images/emptyStar.png"/>';
                }
              }
              html += '</div>'+//end stars
                      '</div>'; //panel body
            }) //each comment

          html += '</div>' + //panel
            '</div>'; //col-md-4
        }) //each cat

      $("#carData").append(html);
    })
  })
