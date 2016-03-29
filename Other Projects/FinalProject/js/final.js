$document.ready(function)


$(".nav").find("li").removeClass("active");
//add active class to clicked li
$(this).addClass("active");

var page = $(this).attr("id");
getPartial(page);

})//click

function getPartial(partial) {

alert(partial);

}


//begin program to get homepage
getPartial("homePage");
