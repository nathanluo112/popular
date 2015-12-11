// $(document).ready(function(){
//   var map;
//   // var markers = [];

//   var coordinates = function() {
//     window.navigator.geolocation.getCurrentPosition(function(args){
//       coords = {
//         lat: args['coords']['latitude'],
//         lng: args['coords']['longitude']
//       };
//       initMap(coords);
//     });
//   };

//   function initMap(coordinates) {
//   // Create a map object and specify the DOM element for display.
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: coordinates,
//       scrollwheel: false,
//       zoom: 13
//     });

//     var marker = new google.maps.Marker({
//       position: coordinates,
//       map: map,
//       title: 'Your location'
//     });
//     nearBy();
//   };

//   function nearBy(){
//     var request = {
//       location: new google.maps.LatLng(coords),
//       radius: 4000,
//       types: ['bar','night_club','stadium']
//     };

//     var callback = function(results, status) {
//       // debugger
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//           var place = results[i];
//           console.log(place.name);
//           createMarker(results[i]);
//         }
//       }
//     }
//     // debugger
//     service = new google.maps.places.PlacesService(map)
//     service.nearbySearch(request, callback);

//   }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }

//   coordinates();

// });
