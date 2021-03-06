// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//= require jquery
//= require jquery_ujs
//= require jquery.remotipart
//= require jquery.form
//= require jquery.touchSwipe.min.js
//= require fb.js
//= require foundation
//= require angular.js
//= require angular-route.js
//= require angular-resource.js
//= require geolocation-marker
//= require swipe

//= require_tree ../templates

//= require map
//= require controllers/eventsController
//= require_tree ./services
//= require remarks
//= require votes
//= require user_show

$(function(){ $(document).foundation(); });
