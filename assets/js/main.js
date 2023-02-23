import { Controller } from './lib.js';


$(document).ready(() => {

  // 0:
  const controller = new Controller();

  //->
  let logo = $('#heading > div > img');
  let search = $('#search input');
  let footer = $('footer');
  let footerContent = $('footer > div');

  // 1:
  footer.fadeIn('slow');
  footerContent.show('drop', {direction: 'down'}, 'slow');

  // 2:
  $('#today-tab').click(() => {
    controller.switchTab();
    footer.fadeIn('fast');
    footerContent.show('drop', {direction: 'down'}, 'fast');
    document.title = 'Triweather - Today';
  });

  $('#forecast-tab').click(() => {
    controller.switchTab();
    footerContent.hide('drop', {direction: 'down'}, 'fast');
    footer.fadeOut('fast');
    document.title = 'Triweather - 5-day forecast';
  });

  // 3:
  $('#heading').hover(
    function() {
      logo.css('transform', 'rotate(270deg)');
    },
    function() {
      logo.css('transform', 'rotate(0deg)');
    }
  );

  // 4:
  $('#search').on('submit', (event) => {
    event.preventDefault();
    if (search.val()) {
      if (controller.getDataByCity(search.val())) {
        search.attr('placeholder', search.val());
        search.val('');
        // ...
      } else {
        // ...
      }
      logo.css('transform', 'rotate(540deg)');
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