$(document).ready(function(){
  $(".vote").on("submit", "form", function(event){
    event.preventDefault();
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize() 
    }).done(function(response){
      location.reload(true);
    }).fail(function(error){
      console.log("You've already voted.");
    });
  });
});