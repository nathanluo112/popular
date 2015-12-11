$(document).ready(function(){
  var map;

  var coordinates = function() {
    window.navigator.geolocation.getCurrentPosition(function(args){
      coords = {
        lat: args['coords']['latitude'],
        lng: args['coords']['longitude']
      };
      initMap(coords);
    });
  };

  function initMap(coordinates) {
  // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('new-map'), {
      center: coordinates,
      scrollwheel: false,
      zoom: 18
    });

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      title: 'Your location'
    });
    nearBy();
  };

  function nearBy(){
    var request = {
      location: new google.maps.LatLng(coords),
      radius: 50,
      types: ['bar','night_club','stadium']
    };

    service = new google.maps.places.PlacesService(map)


    var callback = function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log(place.name);
          createMarker(results[i]);
        }
      }
    }
    service.nearbySearch(request, callback);

  }

function createMarker(place) {
  var infowindow = new google.maps.InfoWindow();
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<h2>' + place.name + '</h2><p>' + place.vicinity + '</p><p>' + (multiplyString('$', place.price_level)) + ' &middot; <a href="#">Make a Scene</a>' + '</p>');
    infowindow.open(map, this);
  });
}

function multiplyString(str, num) {
  newStr = ""
  for (var i = 0; i < num; i++) {
    newStr += str
  };
  return newStr
};

  coordinates();

});
