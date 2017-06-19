
var markers =[];

$( document ).ready(function() {
    console.log( "ready!" );
    $(init);
});
function init(){
  $(".confirm-dest-button").on("click", newDest);
   console.log("click");

  $("body").on('mouseenter', ".place-hours-label", function(event) {
    $(this).next().show();
  }).on('mouseleave', ".place-hours-label", function( event ) {
    $(this).next().hide();
  });




}




function initMap() {
  let map = new google.maps.Map(document.getElementById('places-map'), {
    center: {lat: 1.352083, lng: 103.819836},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f0df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#d4e9b6"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c3e2aa"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#c9bfd1"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#B3CADD"}]}]
  });

}
function getLatitude(){
  return markers[0].position.lat();
}
function getLongtitude(){
  return markers[0].position.lng();
}

function newDest() {
  getNearby("new",getLatitude(),getLongtitude());
  $("#edit-trip-div").show();
}

function getNearby(e,lat,lng){
   let settings = e;
   $("#search-div").hide();
  $('.confirm-dest-button').remove();


  if (e=='new') {
    createTrip();
  }

	var dest = {
    lat: lat,
    lng: lng
  };


  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: dest,
    radius: 500,
    types: ['airport','cafe','art_gallery','church','dentist','park','stadium','zoo']
  }, callback);
}
