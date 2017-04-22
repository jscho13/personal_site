// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require payola
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
//= require_tree .

// $( document ).ready(function() {
//   $('body').attr('height',$(window).height());
// });

$(document).ready(function() {
  // Header:
  // First two lines cleans menu toggle
  // On click handler slides the menu
  // If menu is already hidden remove the hidden styling  
  var menuToggle = $('#js-mobile-menu').off();
  $('#js-navigation-menu').removeClass("show");
  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
  
  var chart_data = {};
  var ctx = document.getElementById("dsqAverageChart");
  $.get( "/dsq_chart_data").done(function(data) {
    var dsqAverageChart = new Chart(ctx, {
      type: 'line',
      data: data
    });
  });
});
