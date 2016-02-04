var fb_login_after;
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    $("#connect-directions").hide();
    // Logged into your app and Facebook.
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    $.get("/logout", function(res){ res=res+""; if (res=="reload") window.location.reload(true);}); //window.location.reload(true);
    document.getElementById('fb-status').innerHTML = 'Please log ' +
    'into this app.';
  } else {
    $.get("/logout", function(res){ res=res+""; if (res=="reload") window.location.reload(true);});
    $("#connect-directions").show();
    document.getElementById('fb-status').innerHTML = 'Please log ' +
    'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1325363560823152',

    cookie: true,  // enable cookies to allow the server to access
                      // the session
    xfbml      : true,
    version    : 'v2.5'
  });

  $(window).focus(function(){
    checkLoginState();
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  FB.Event.subscribe('auth.logout', logout_event);
  function logout_event(){$.get("/logout", function(res) {res=res+""; if (res=="reload") window.location.reload(true);})}


  fb_login_after = function($el) {
    FB.api('/me',{fields: 'last_name,first_name,gender,id'}, function(response1){
      FB.api("/me/picture", {type: "large" }, function(response2) {
        if (response2 && !response2.error) {
          $.post("/users", {first_name: response1.first_name,last_name: response1.last_name, facebook_id: response1.id, profile_pic_url: response2.data.url}, function(res) {
            $("#fade-out-div").fadeOut(600);
            $.get("/events").then(function(res){
              $('body').fadeOut(400, function(){
                document.location.href = "/events";
              });
            }); 
          });
        }
      });
      $('#fb-status').innerHTML = 'Thanks for logging in, ' + response1.name + '!';
    });
  }

};

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));



