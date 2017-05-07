$(document).ready(function() {
  var ctx = document.getElementById("dsqAverageChart");
  $.get( "/api/dsq_month_data", { month: moment().month(), year: moment().year() } ).done(function(data) {
    var dsqAverageChart = new Chart(ctx, {
      type: 'line',
      data: data
    });
  });
});
