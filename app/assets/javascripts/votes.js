$(document).ready(function(){
  $(".vote").on("submit", "form", function(event){
    event.preventDefault();
    debugger
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize() 
    }).done(function(response){
      debugger  
      $(".vote").remove();
      $(".voted").show();
    }).fail(function(error){
      console.log("You've already voted.");
    });
  });
});