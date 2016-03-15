$("#getClients").on("click", function(){

var url = "https://katherina26.github.io/Other%20Projects/AjaxExamples/JSONdatabase/clients.json"
$.getJSON(url, function (data){

$.each(data, function(index, item){
  $("data").append(item.name);
})
//alert(data);
//console.dir(data);
})

})
