class DsqChartPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().month(),
      year: moment().year(),
      date_options: []
    }
    this.updateDsqDateFilter = this.updateDsqDateFilter.bind(this);
  }

  componentDidMount() {
    var ctx = document.getElementById("dsqAverageChart");
    $.get( "/api/dsq_month_data", { month: this.state.month, year: this.state.year } ).done(function(data) {
      var dsqAverageChart = new Chart(ctx, {
        type: 'line',
        data: data
      });
    });
    
    fetch("/api/dsq_date_options", { credentials: "same-origin"})
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ date_options: responseJson});
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateDsqDateFilter(month, year) {
    debugger
  }

  render() {
    return(
      <div>
        <DateOptionsList
          dateOptions={this.state.date_options}
          updateDsqDateFilter={this.updateDsqDateFilter}
        />
        <canvas id="dsqAverageChart" width="100" height="50"></canvas>
      </div>
    );
  }
};
