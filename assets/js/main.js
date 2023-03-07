import { Controller } from './lib.js';


$(document).ready(() => {

  // 0:
  const controller = new Controller();

  //->
  let logo = $('#heading > div > img');
  let search = $('#search input');
  let forecastWeather = $('#weather-forecast');

  // 1:
  forecastWeather.css('display', 'flex');
  forecastWeather.hide(1);

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
  for (let i = 1; i<=5; i++) {
    forecastWeather.on('click', `#day-${i}-btn`, () => {
      controller.setForecastDay(i);
    });
    forecastWeather.on('mouseenter', `#day-${i}-btn`, () => {
      $(`#day-${i}-btn`).css('background-color', 'rgb(100, 110, 131)');
    });
    forecastWeather.on('mouseleave', `#day-${i}-btn`, () => {
      if ($(`#day-${i}-btn`).css('pointer-events') === 'none')
        $(`#day-${i}-btn`).css('background-color', 'rgb(80, 96, 128)');
      else
        $(`#day-${i}-btn`).css('background-color', 'rgb(48, 58, 77)');
    });
  }

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