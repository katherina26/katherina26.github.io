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

}

}


//begin program to get homepage
getPartial("homePage");
)}
