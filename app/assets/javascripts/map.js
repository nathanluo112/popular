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

  $scope.eventItem = function(){

    $scope.focusEvent = findEventById(parseInt(event.currentTarget.dataset.id))
    marker = findMarkerByEvent($scope.focusEvent);
    // map.setCenter()
    google.maps.event.trigger(marker, 'click');

  }

  $scope.focusEventItem = function(){
    marker = findMarkerByEvent($scope.focusEvent);
    google.maps.event.trigger(marker, 'click');
  }

  $scope.joinEvent = function(){

  }

  function findMarkerByEvent(event){
    for (var i = 0; i < markers.length; i ++) {
      if (markers[i].position.lat().toFixed(13) == event.lat.toFixed(13) && markers[i].position.lng().toFixed(13) == event.lng.toFixed(13) && markers[i].title == event.venue_name){
        return markers[i];
      }
    }
  }

  function findEventByMarker(marker){

  }

  function findEventById(id){
    for (var i = 0; i < $scope.data.length; i++) {
      if ($scope.data[i].id == id){
        return $scope.data[i];
      }
    }
  }
  function initMap(coordinates) {
  // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      scrollwheel: false,
      zoom: 12
    });
    $scope.currentLocationMarker = new google.maps.Marker({
      position: coordinates,
      map: map,
      label: 'Your location'
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
        $scope.focusEvent = event;
        $scope.focusMarker = marker;
        infowindow.open(map, marker);
        map.panTo(this.position);
        map.setZoom(16);
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

  function removeAllMarkersExceptCenterAndFocus(){
    var tmp = [];
    for(var i = 0; i < markers.length; i++) {
      if ((markers[i].position.lat() != map.center.lat() || markers[i].position.lng() != map.center.lng()) && (markers[i] != $scope.focusMarker)) {

        markers[i].setMap(null);

      } else {
        tmp.push(markers[i]);
      }
    }
    markers = tmp;
  }

  function newBoundQuery(){
    removeAllMarkersExceptCenterAndFocus();
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
      console.log(markers);
    }, function(error){
      console.log(error);
    });
  }

});


