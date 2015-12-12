$(document).ready(function(){

  
  $(".remark_buttons").on("click", "a", function(event){
    event.preventDefault();
    $(event.target).parent().hide();
    $(event.target).parent().next().toggle();
  });

  $(".remark_form").on("submit", "form", function(event){
    event.preventDefault();
    debugger
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize()
    }).done(function(response){ 
      debugger 
      $(event.target).parent().hide();
      $(event.target).parent().next().css("visibility", "visible");
    }).fail(function(error){
      console.log("You've already made a remark.");
    });
  });

});

