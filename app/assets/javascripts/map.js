var map;
var markers = [];

angular.module('listing-event', []);

angular.module('listing-event').controller("listController", function($scope, $http, $window){
  $scope.SEARCH_MODE = 1;
  $scope.CREATE_MODE = 0;
  $scope.displayPlaces = false;
  $scope.joinableEvents = [];
  $scope.data = [];
  $scope.currentLocationMarker;
  $scope.focusEvent;
  $scope.focusMarker;
  $scope.mode = $scope.SEARCH_MODE;
  $scope.places = [];

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
    var timeoutId;
    map.addListener("bounds_changed", function(){
      if ($scope.mode == $scope.SEARCH_MODE) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function(){
          newBoundQuery();
        }, 200);
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function(){
          nearBy();
        }, 200);
      }
    })
  });

  $scope.eventItem = function(){

    $scope.focusEvent = findEventById(parseInt(event.currentTarget.dataset.id))
    marker = findMarkerByEvent($scope.focusEvent);
    google.maps.event.trigger(marker, 'click');

  }

  $scope.focusEventItem = function(){
    marker = findMarkerByEvent($scope.focusEvent);
    google.maps.event.trigger(marker, 'click');
  }

  $scope.joinEvent = function(){
    $scope.mode = $scope.SEARCH_MODE;
    $scope.displayPlaces = false;
    map.panTo($scope.currentLocationMarker.position)
    map.setZoom(20);
  }

  $scope.listPlaces = function(){
    map.setCenter($scope.currentLocationMarker.position);
    map.setZoom(20);
    $scope.mode = $scope.CREATE_MODE;
    // --------------- Comment out for testing --------------
    // $scope.bounds = map.getBounds();
    // ---------------------------------------------------
  }

  $scope.createEvent = function(place){
    var event = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      venue_name: place.name,
      address: place.vicinity,
      place_id: place.place_id
    };

    $http({
      method: 'post',
      url: '/events',
      data: {event: event}
    }).then(function(data){
      $scope.redirectTo(data.data.id);
    }, function(error){
      console.log(error);
    });

  }

  $scope.redirectTo = function(id) {
    $window.location.href = '/events/' + id;
  }

  function rad(x) {
    return x * Math.PI / 180;
  }

  function distance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  }

  function findMarkerByEvent(event){
    for (var i = 0; i < markers.length; i ++) {
      if (markers[i].position.lat().toFixed(13) == event.lat.toFixed(13) && markers[i].position.lng().toFixed(13) == event.lng.toFixed(13) && markers[i].title == event.venue_name){
        return markers[i];
      }
    }
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
    $scope.currentLocationMarker = new GeolocationMarker(map);
    $scope.currentLocationMarker.setCircleOptions({visible: false})
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
        if (map.getZoom() < 16){
          map.setZoom(16);
        }
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
    console.log("query");
    $scope.bounds = map.getBounds();
    var maxlat = Math.max($scope.bounds.O.j, $scope.bounds.O.O);
    var minlat = Math.min($scope.bounds.O.j, $scope.bounds.O.O);
    var maxlng = Math.max($scope.bounds.j.O, $scope.bounds.j.j);
    var minlng = Math.min($scope.bounds.j.O, $scope.bounds.j.j);
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
    }).then(function(){
      setJoinableEvents();
    });
  }

  function setJoinableEvents() {
    for(var i = 0; i < $scope.data.length; i++) {
      var eventPoint = {lat: $scope.data[i].lat, lng: $scope.data[i].lng}
      var currentPoint = {
        lat: $scope.currentLocationMarker.position.lat(),
        lng: $scope.currentLocationMarker.position.lng()
      }

      if (distance(eventPoint, currentPoint) < 500){
        $scope.data[i].joinable = true;
      } else {
        $scope.data[i].joinable = false;
      }
    }
  }

  function nearBy(){
    var request = {
      bounds: $scope.bounds,
      types: ['bar','night_club','stadium']
    };
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        $scope.places = results;
        console.log($scope.places);
        // drawList(results);
      }
    });
  }

});


