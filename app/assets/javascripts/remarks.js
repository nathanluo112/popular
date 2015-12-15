$(document).ready(function(){
  
  $(".remark_vote").on("submit", "form", function(event){
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

  $(".hate_form").on("submit", "form" ,function(event){
    event.preventDefault();
    
    $(event.target).parent().hide();
    $(event.target).parent().parent().find(".remark_buttons").html
    ("<span class='small-6 columns remarked_already centered'> remarked </span>");
  });

  $(".love_form").on("submit", "form" ,function(event){
    event.preventDefault();
    
    $(event.target).parent().hide();
    $(event.target).parent().parent().find(".remark_buttons").html
    ("<span class='small-6 columns remarked_already centered'> remarked </span>");
  });

});