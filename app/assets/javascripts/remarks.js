$(document).ready(function(){
  
  // var address = $(".address").text();
  // var place = $.get("https://maps.googleapis.com/maps/api/place/textsearch/json?", function(data){
  //   address;
  // }).done(function(response){
  //   debugger
  // });

  $(".remark_buttons").on("click", "a", function(event){
    event.preventDefault();
    $(event.target).parent().hide();
    $(event.target).parent().next().show();
  });

  $("[name = 'back']").on("click", function(event){
    event.preventDefault();
    $(event.target).parent().hide();
    $(event.target).parent().parent().prev().show();
  });

  $(".remark_form").on("submit", "form", function(event){
    event.preventDefault();
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize()
    }).done(function(response){ 
       
      $(event.target).parent().hide();
      $(event.target).parent().next().css("visibility", "visible");
    }).fail(function(error){
      console.log("You've already made a remark.");
    });
  });

});