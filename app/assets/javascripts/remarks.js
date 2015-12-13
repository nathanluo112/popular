$(document).ready(function(){
  
  // var address = $(".address").text();
  // var place = $.get("https://maps.googleapis.com/maps/api/place/textsearch/json?", function(data){
  //   address;
  // }).done(function(response){
  //   debugger
  // });

  $(".remark_buttons").on("click", "a.hate", function(event){
    event.preventDefault();
    
    $(event.target).parent().hide();
    $(event.target).parent().next().next().show();
  });

  $(".remark_buttons").on("click", "a.love", function(event){
    event.preventDefault();
    
    $(event.target).parent().hide();
    $(event.target).parent().next().show();
  });

  $(".love_form").on("click", "button", function(event){
    event.preventDefault();
        
    $(event.target).parent().parent().hide();
    $(event.target).parent().parent().prev().show();
  });

  $(".hate_form").on("click", "button" ,function(event){
    event.preventDefault();
    
    $(event.target).parent().parent().hide();
    $(event.target).parent().parent().prev().prev().show();
  });

  $(".love_form").on("submit", "form", function(event){
    event.preventDefault();
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize()
    }).done(function(response){ 
      $(event.target).parent().hide();
      location.reload(true);
    }).fail(function(error){
      console.log("You've already made a remark.");
    });
  });

  $(".hate_form").on("submit", "form", function(event){
    event.preventDefault();
    $.ajax({
      method: "post",
      url:    $(event.target).attr("action"),
      data:   $(event.target).serialize()
    }).done(function(response){ 
      $(event.target).parent().hide();
      location.reload(true);
    }).fail(function(error){
      console.log("You've already made a remark.");
    });
  });

});