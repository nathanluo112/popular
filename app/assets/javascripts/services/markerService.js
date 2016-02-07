app.factory('markerService', function(){
	var rq = "F7CAC9";
  var rq2 = "DE8A89";
  var rq3 = "C55452";
  var rq4 = "AC6B6A";
  var rq5 = "933F3D";
  var s = "92A8D1";
  var s2 = "5C7CB8";
  var s3 = "2F569F";
  var s4 = "425A86";
  var s5 = "4c576d";


  var vPopular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq,
    null,
    null,
    null,
    new google.maps.Size(24, 40));

  var popular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq2,
    null,
    null,
    null,
    new google.maps.Size(21, 35));

  var average = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq3,
    null,
    null,
    null,
    new google.maps.Size(18, 30));

  var unpopular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq4,
    null,
    null,
    null,
    new google.maps.Size(15, 25));

  var vUnpopular = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + rq5,
    null,
    null,
    null,
    new google.maps.Size(12, 20));

    var greatHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s,
    null,
    null,
    null,
    new google.maps.Size(24, 40));

  var goodHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s2,
    null,
    null,
    null,
    new google.maps.Size(21, 35));

  var averageHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s3,
    null,
    null,
    null,
    new google.maps.Size(18, 30));

  var badHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s4,
    null,
    null,
    null,
    new google.maps.Size(15, 25));

  var vBadHouse = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + s5,
    null,
    null,
    null,
    new google.maps.Size(12, 20));

  return {
	  calcPopForPin: function(event) {
	    if (event.house_party == false) {
	      if (event.score > 1000) {return vPopular}
	      else if (event.score > 499) {return popular}
	      else if (event.score > 99) {return average}
	      else if (event.score > 9) {return unpopular}
	      else {return vUnpopular}
	    }
	    else {
	      if (event.score > 750) {return greatHouse}
	      else if (event.score > 350) {return goodHouse}
	      else if (event.score > 80) {return averageHouse}
	      else if (event.score > 9) {return badHouse}
	      else {return vBadHouse}
	    }
	  }
	}
})