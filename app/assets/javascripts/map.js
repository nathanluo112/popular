$(document).ready(function(){
  var map;
  var markers = [];


  new Promise(function(resolve, reject){
    window.navigator.geolocation.getCurrentPosition(function(args){
      coords = {
        lat: args['coords']['latitude'],
        lng: args['coords']['longitude']
      };
      resolve(coords);
    });

  }).then(function(coords){
      initMap(coords);
      return coords;
  }).then(function(){
    // var bounds = map.getBounds();
    // var maxlat = Math.max(bounds.O.j, bounds.O.O);
    // var minlat = Math.min(bounds.O.j, bounds.O.O);
    // var maxlng = Math.max(bounds.j.O, bounds.j.j);
    // var minlng = Math.min(bounds.j.O, bounds.j.j);
    var maxlat = coords.lat + 0.05;
    var minlat = coords.lat - 0.05;
    var maxlng = coords.lng + 0.05;
    var minlng = coords.lng - 0.05;
    var url = "/events/near?"+ "bound[maxlat]=" + maxlat +"&bound[minlat]=" + minlat +"&bound[maxlng]=" + maxlng + "&bound[minlng]=" + minlng;

    $.get(url).done(function(data){
      for (var i = 0; i < data.length; i++){
        addMarker(data[i]);
      }

    }).fail(function(error){
      console.log(error);
    });

    map.addListener("bounds_changed", function(){

      newBoundQuery();
    });
  })

  function newBoundQuery(){
    var bounds = map.getBounds();
    var maxlat = Math.max(bounds.O.j, bounds.O.O);
    var minlat = Math.min(bounds.O.j, bounds.O.O);
    var maxlng = Math.max(bounds.j.O, bounds.j.j);
    var minlng = Math.min(bounds.j.O, bounds.j.j);
    var url = "/events/near?"+ "bound[maxlat]=" + maxlat +"&bound[minlat]=" + minlat +"&bound[maxlng]=" + maxlng + "&bound[minlng]=" + minlng;
    console.log(bounds);
    $.get(url).done(function(data){
      for (var i = 0; i < data.length; i++){
        addMarker(data[i]);
      }

    }).fail(function(error){
      console.log(error);
    });
  }






  function initMap(coordinates) {
  // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      scrollwheel: false,
      zoom: 13
    });
    console.log("in")
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: 'Your location'
    });
    var bounds = map.getBounds();
    return bounds;
  };


  function addMarker(event){
    var marker = new google.maps.Marker({
      map: map,
      position: {lat: parseFloat(event.lat), lng: parseFloat(event.lng)}
    });

    google.maps.event.addListener(marker, 'click', function(){
      map.setCenter(this.position);
      map.setZoom(16);
      console.log();
    })

  }

});
