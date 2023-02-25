import { Controller } from './lib.js';


$(document).ready(() => {

  // 0:
  const controller = new Controller();

  //->
  let logo = $('#heading > div > img');
  let search = $('#search input');
  
  // 1:
  $('footer').fadeIn('slow');
  $('footer > div').show('drop', {direction: 'down'}, 'slow');

  // 2:
  $('#today-tab').click(() => {
    controller.switchTab();
  });

  $('#forecast-tab').click(() => {
    controller.switchTab();
  });

  // 3:
  $('#heading').hover(
    function() {
      if ($('html').width() >= 576)
        logo.css('transform', 'rotate(270deg)');
    },
    function() {
      if ($('html').width() >= 576)
        logo.css('transform', 'rotate(0deg)');
    }
  );

  // 4:
$('#search').on('submit', (event) => {
    event.preventDefault();
    if (search.val()) {
      search.attr('placeholder', 'Search');
      controller.getDataByCity(search.val());
      search.val(''); 
      logo.css('transform', 'rotate(540deg)');
      setTimeout(function() {
        logo.css('transform', 'rotate(0deg)');
      }, 3000);
    }
  });

  //->
  controller.getDataByCity('Kyiv');
  
  //->
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        controller.getDataByCoordinates(position.coords.latitude, position.coords.longitude);
      } 
    );

});