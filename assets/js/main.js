import { Controller } from './lib.js';


$(document).ready(() => {

  const controller = new Controller();

  $('footer').fadeIn('slow');
  $('footer > div').show('drop', {direction: 'down'}, 'slow');

  $('#today-tab').click(() => {
    controller.switchTab();
    $('footer').fadeIn('fast');
    $('footer > div').show('drop', {direction: 'down'}, 'fast');
    document.title = 'Triweather - Today';
  });

  $('#forecast-tab').click(() => {
    controller.switchTab();
    $('footer > div').hide('drop', {direction: 'down'}, 'fast');
    $('footer').fadeOut('fast');
    document.title = 'Triweather - 5-day forecast';
  });

  $('#heading').hover(
    function() {
      $('#heading > div > img').css('transform', 'rotate(270deg)');
    },
    function() {
      $('#heading > div > img').css('transform', 'rotate(0deg)');
    }
  );

  controller.getData();
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      } 
    );
  }

});