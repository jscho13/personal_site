class DsqDateFilterItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    fetch(`/api/dsq_month_data?month=${event.target.value}&year=${this.props.year}`, { credentials: "same-origin" })
    .then(response => response.json())
    .then(responseJson => {
      $('#dsqAverageChart').remove();
      $('#dsqPanelContainer').append('<canvas id="dsqAverageChart" width="100" height="50"></canvas>');
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
    let monthOptions = this.props.months.map((month) => {
      let monthName = moment(month, 'M').format('MMM');
      
      return (
        <option value={month}>
          {monthName}
        </option>
      )
    });

    return (
      <div className="dsq-date-filter--option">
        <label>{this.props.year}</label>
        <select className="select-style" onClick={this.handleChange}>
          {monthOptions}
        </select>
      </div>
    );
  }
}
