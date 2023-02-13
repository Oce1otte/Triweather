import { Controller } from './lib.js';


$(document).ready(() => {

  const controller = new Controller();

  controller.getData();
  
  $('#today-tab').click(() => {
    controller.switchTab();
    document.title = 'Triweather - Today';
  });

  $('#forecast-tab').click(() => {
    controller.switchTab();
    document.title = 'Triweather - 5-day forecast';
  });

});