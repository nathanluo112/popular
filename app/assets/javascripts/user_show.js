var token;
var app=angular.module("listing-event");
app.controller('usercontroller', function($scope, $http) {
    var t=''+window.location+'';
    t=t.split("#access_token=");
    if (t.length == 2)
      {token=t[1];
        $http.post("/set_instagram_token", {token : t[1] }).then(function(res){
        }); }
    else
      $http.get("/get_instagram_token").then(function(res){
        token=res.data;
        getInstagramPics();
      });

    function getInstagramPics() {
    if (token!=null){
      $.ajax({
        method: "GET",
        url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+token,
        dataType: "jsonp"
      }).then(function(res){
        var images=[];
        var images_counter = res.data.length;
        for (var i = 0; i< images_counter; i++) {
          var tags_counter = res.data[i].tags.length;
          for (var j=0; j < tags_counter; j++) {
            if (res.data[i].tags[j].toLowerCase() == "popular"){
              images.push(res.data[i]);
              break; }
          }
        };
        $scope.images_array = images;
        $scope.$apply();
      });
    }
    }

    $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-events-top").slideDown();
        $("user-instagram-top").hide();

    $(".user-nav-bar a").click(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      var nav = e.target.innerHTML;
      if (nav == "Events") {
        $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-events-top").slideDown();
        $("user-instagram-top").hide();
      }
      else if (nav == "Shade/Love Given") {
        $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-made-top").slideDown();
        $("user-instagram-top").hide();
      }
      else if (nav == "Shade/Love Received") {
        $("#user-made-top").hide();
        $("#user-received-top").hide();
        $("#user-events-top").hide();
        $("#user-received-top").slideDown();
        $("user-instagram-top").hide();
      }


    });

     // $(".switch").click(function(e){
     //    for (var x=0; x < 3; x++) {
     //      $($(".accordian")[x]).slideUp();
     //    }
     //   $(this).next().slideDown();
     // });

     // for (var x=1; x < 3; x++) {
     //      $($(".accordian")[x]).slideUp();
     //    }

     // /current_user_data
     $http.get("/current_user_data/"+window.location.pathname.split("/").pop()).then(function(res){
      $scope.user = res.data;
    });

     $("#user-search-bar").keyup(function(){
      name=this.value;
      console.log("test "+name);
      if (name=="") {
        $scope.search_results=[];
        $scope.$apply();}
      else {
      $.get("/user_search", {name: name}).done(function(res){
        console.log(res);
        $scope.search_results=res;
        $scope.$apply();
      });
        }
     }); //$("#user-search-bar").keyup(function(




}); // app.controller('usercontroller', fun

// app.directive("onEventsFinish", function() {
//   return function($scope) {
//   if ($scope.$last) {
//     $("#user_events").slideDown("slow");
//   } }

// });

// angular.element(document).ready(function(){
//   angular.bootstrap(document,["listing-event"]);
//   });



