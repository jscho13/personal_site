class DsqChartPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().month()+1,
      year: moment().year(),
      date_options: []
    }
    this.updateDsqDateFilter = this.updateDsqDateFilter.bind(this);
  }
  
  componentDidMount() {    
    fetch(`/api/dsq_month_data?month=${this.state.month}&year=${this.state.year}`, { credentials: "same-origin" })
      .then(response => response.json())
      .then(responseJson => {
        var ctx = $('#dsqAverageChart');
        var dsqAverageChart = new Chart(ctx, {
          type: 'line',
          data: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });

    fetch("/api/dsq_date_options", { credentials: "same-origin" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ date_options: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateDsqDateFilter(month, year) {
    fetch(`/api/dsq_month_data?month=${month}&year=${year}`, { credentials: "same-origin" })
    .then(response => response.json())
    .then(responseJson => {
      $('#dsqAverageChart').remove();
      $('#dsqChartPanelContainer').append('<canvas id="dsqAverageChart" width="100" height="50"></canvas>');
      var ctx = $('#dsqAverageChart');
      var dsqAverageChart = new Chart(ctx, {
        type: 'line',
        data: responseJson
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return(
      <div id="dsqChartPanelContainer">
        <DateOptionsList
          dateOptions={this.state.date_options}
          updateDsqDateFilter={this.updateDsqDateFilter}
        />
        <canvas id="dsqAverageChart" width="100" height="50"></canvas>
      </div>
    );
  }
};
