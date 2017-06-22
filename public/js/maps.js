


//GOOGLE MAP PLACES API

  var markers =[];
  function initMap() {
    var map = new google.maps.Map(document.getElementById('places-map'), {
      center: {lat: 1.352083, lng: 103.819836},
      zoom: 13,
      mapTypeId:'roadmap'
    });

  // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });


    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
     searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

  }
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      createNewActivity(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    }

    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function newTrip(){
  getNearbyPlaces("new",getInfo().latitude,getInfo().longitude);
  var newTrip = document.getElementById("#edit-trip-div");
  newTrip.style.display = '';
}



function getNearbyPlaces(status,lat,lng){

  document.getElementById("#search-div").style.visibility = "hidden";
  documentgetElementsByClassName('.confirm-dest-button').parentNode
    .removeChild(document.getElementsByClassName('confirm-dest-button'));



   var service = new google.maps.places.PlacesService(map);
   const request ={
      location: destination,
       radius : 500,
       types :['airport','cafe','art_gallery','church','dentist','park','stadium','zoo']
   };

   service.nearbySearch(request,callback);

}

  var dest = {lat: lat, lng: lng};

function createNewTrip(lat,lng){
    $.ajax({
    url: '/trips',
    type: 'post',
    data: { trip: {
      "destination": $('#destination').val(),
      "longitude" : lat,
      "latitude" : lng
    }
    }
    }).done(function(trip) {
      $('#done-button').data('trip-id',trip._id)
      $("#trips-list").empty();
      populateTripsList();
    });
}

function deleteTrip() {
  var deletebutton = $(deletebutton);

  var selectedTripid = removeButton.data('destination');

  $.ajax({
    url: '/newtrip/' ,
    type: 'delete'
  }).done(function(place) {

  });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {

  }
}
