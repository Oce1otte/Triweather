import { Controller } from './lib.js';


$(document).ready(() => {

  // 0:
  const controller = new Controller();

  //->
  let logo = $('#heading > div > img');
  let search = $('#search input');
  let day1Button = $('#day-1-btn');
  let day2Button = $('#day-2-btn');
  let day3Button = $('#day-3-btn');
  let day4Button = $('#day-4-btn');
  let day5Button = $('#day-5-btn');
  let day1Form = $('#day-1-form');
  let day2Form = $('#day-2-form');
  let day3Form = $('#day-3-form');
  let day4Form = $('#day-4-form');
  let day5Form = $('#day-5-form');

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
  day1Button.click(() => {
    day1Button.css({
      'pointer-events': 'none'
    });
  });

  day2Button.click(() => {
    
  });

  day3Button.click(() => {
    
  });

  day4Button.click(() => {
    
  });

  day5Button.click(() => {
    
  });

  // 5:
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