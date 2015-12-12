var map;
var markers = [];


angular.module('listing-event', []);

angular.module('listing-event').controller("listController", function($scope, $http){

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
    var timoutId;
    map.addListener("bounds_changed", function(){
      clearTimeout(timoutId);
      timoutId = setTimeout(function(){
      newBoundQuery();
      }, 200);
    });
  });

  $scope.eventDetail = function(){

  }

  function initMap(coordinates) {
  // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      scrollwheel: false,
      zoom: 12
    });
    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: 'Your location'
    });

    var bounds = map.getBounds();
    return bounds;
  };


  function addMarker(event){
    if (!eventMarkerExists(event)) {
      var marker = new google.maps.Marker({
        map: map,
        position: {lat: parseFloat(event.lat), lng: parseFloat(event.lng)},
        title: event.venue_name
      });

      var infowindow = new google.maps.InfoWindow({
        content: event.venue_name,
        maxWidth: 200
      });

      markers.push(marker);
      console.log("added a marker")
      google.maps.event.addListener(marker, 'click', function(){
        map.setCenter(this.position);
        map.setZoom(16);
        infowindow.open(map, marker);
      })
    }
  }

  function eventMarkerExists(event){
    if (markers.length > 0 ){
      for (var i = 0; i < markers.length; i++){
        if (markers[i].position.lat().toFixed(13) == parseFloat(event.lat).toFixed(13) && markers[i].position.lng().toFixed(13) == parseFloat(event.lng).toFixed(13)){
          return true;
        }
      }
    } else {
      return false;
    }
  }

  function removeAllMarkers(){
    for(var i = 0; i < markers.length; i++) {
      if (markers[i].position.lat() != map.center.lat() || markers[i].position.lng() != map.center.lng()){
        markers[i].setMap(null);
      } else {
        var center = markers[i];
      }
    }
    markers=[];
    if (center){
      markers.push(center);
    }
  }

  function newBoundQuery(){
    removeAllMarkers();
    var bounds = map.getBounds();
    var maxlat = Math.max(bounds.O.j, bounds.O.O);
    var minlat = Math.min(bounds.O.j, bounds.O.O);
    var maxlng = Math.max(bounds.j.O, bounds.j.j);
    var minlng = Math.min(bounds.j.O, bounds.j.j);
    var url = "/events/near?"+ "bound[maxlat]=" + maxlat +"&bound[minlat]=" + minlat +"&bound[maxlng]=" + maxlng + "&bound[minlng]=" + minlng;

    $http({method: "get", url: url}).then(function(data){
      var events = data.data;
      for (var i = 0; i < events.length; i++){
        addMarker(events[i]);
      }
      $scope.data = events;
    }, function(error){
      console.log(error);
    });
  }

});


