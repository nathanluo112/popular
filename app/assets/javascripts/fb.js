  var fb_login_after;
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      $("#connect-directions").hide();
      // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
     // $.get("/logout");
      document.getElementById('fb-status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
     // $.get("/logout");
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
    appId      : '1692192954346001',

    cookie     : true,  // enable cookies to allow the server to access
                        // the session
     xfbml      : true,
     version    : 'v2.5'
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

FB.Event.subscribe('auth.logout', logout_event);
  function logout_event(){$.get("/logout", function(res) {console.log(res);})}


  fb_login_after = function($el) {
  FB.api('/me',{fields: 'last_name,first_name,gender,id'}, function(response1){
    FB.api("/me/picture", {type: "large" }, function(response2) {if (response2 && !response2.error) {
    var tok=$("meta[name='csrf-token']").attr("content");
    $.post("/users?authenticity_token="+tok, {first_name: response1.first_name,last_name: response1.last_name, facebook_id: response1.id, profile_pic_url: response2.data.url}, function(res) {console.log($('#get_user_link').attr("href")); $('#get_user_link').attr("href","/users/"+res.id)});
    } });
    $('#fb-status').innerHTML = 'Thanks for logging in, ' + response1.name + '!';
    });
} //  end function fb_login_after() {

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));




