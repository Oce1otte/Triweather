import { Controller } from './lib.js';


$(document).ready(() => {

  // 0:
  const controller = new Controller();

  //->
  let logo = $('#heading > div > img');
  let search = $('#search input');
  let forecastWeather = $('#weather-forecast');

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
  forecastWeather.on('click', '#day-1-btn', () => {
    controller.setForecastDay(1);
  });

  forecastWeather.on('click', '#day-2-btn', () => {
    controller.setForecastDay(2);
  });

  forecastWeather.on('click', '#day-3-btn', () => {
    controller.setForecastDay(3);
  });

  forecastWeather.on('click', '#day-4-btn', () => {
    controller.setForecastDay(4);
  });

  forecastWeather.on('click', '#day-5-btn', () => {
    controller.setForecastDay(5);
  });

  // 5:
$('#search').on('submit', (event) => {
    event.preventDefault();
    if (search.val()) {
      search.prop('disabled', true);
      setTimeout(() => {
        search.prop('disabled', false);
        search.focus();
      }, 350);
      search.attr('placeholder', 'Search');
      controller.getDataByCity(search.val());
      logo.css('transform', 'rotate(540deg)');
      setTimeout(() => {
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