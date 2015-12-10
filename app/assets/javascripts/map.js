$(document).ready(function(){
  var map;
  // var markers = [];

  var coordinates = function() {
    window.navigator.geolocation.getCurrentPosition(function(args){
      var coords = {
        lat: args['coords']['latitude'],
        lng: args['coords']['longitude']
      };
      initMap(coords);
    });
  };

  function initMap(coordinates) {
  // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      scrollwheel: false,
      zoom: 13
    });

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: 'Your location'
    });

    map.addListener('click', function(event) {
      addMarker(event.latLng);
    });
  };

  function nearByMap(coordinates){
  }

  // function addMarker(location) {
  //   var marker = new google.maps.Marker({
  //     position: location,
  //     map: map
  //   });
  //   markers.push(marker);
  // }

  // // Sets the map on all markers in the array.
  // function setMapOnAll(map) {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(map);
  //   }
  // }

  // // Removes the markers from the map, but keeps them in the array.
  // function clearMarkers() {
  //   setMapOnAll(null);
  // }

  // // Shows any markers currently in the array.
  // function showMarkers() {
  //   setMapOnAll(map);
  // }

  // // Deletes all markers in the array by removing references to them.
  // function deleteMarkers() {
  //   clearMarkers();
  //   markers = [];
  // }

  coordinates();

});
