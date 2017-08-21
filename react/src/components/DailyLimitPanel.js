import React from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';

class DailyLimitPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allowable_spending: 0,
      days_left: 0,
      dsq_average: 0,
      submission_date: moment()
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSpendingChange = this.handleSpendingChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    let start = moment();
    let end = moment().endOf('month');
    let daysLeft  = end.diff(start, 'days') + 1;
    fetch('/api/user_budget_data', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ allowable_spending: responseJson.allowable_spending
                      , days_left: daysLeft
                      , dsq_average: (responseJson.allowable_spending/daysLeft).toFixed(2) });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSpendingChange(event) {
    let newAllowableSpending = event.target.value;
    let newDsq = (newAllowableSpending/this.state.days_left).toFixed(2);
    this.setState({ allowable_spending: newAllowableSpending
                  , dsq_average: newDsq });
  }

  handleDateChange(date) {
    let end = moment().endOf('month');
    let newDaysLeft = end.diff(date, 'days') + 1;
    let newDsq = (this.state.allowable_spending/newDaysLeft).toFixed(2);
    this.setState({ submission_date: date
                  , days_left: newDaysLeft
                  , dsq_average: newDsq });
  }

  handleSubmit(event) {
    event.preventDefault();
    $.post( "/dsq_averages", {
      allowable_spending: this.state.allowable_spending,
      days_left: this.state.days_left,
      dsq_average: this.state.dsq_average,
      submission_date: this.state.submission_date.format("MM DD YYYY")
    }).done(window.location.replace("/features"));
    
    // update the chart
    // https://stackoverflow.com/questions/17354163/dynamically-update-values-of-a-chartjs-chart
  }

  render() {
    return (
      <form className="daily-limit-panel" onSubmit={this.handleSubmit}>
        <div className="daily-limit-panel__left">
          <div>
            <label>Date</label>
            <DatePicker
              id="submissionDate"
              selected={this.state.submission_date}
              onChange={this.handleDateChange}
            />
          </div>
          <div>
            <label>Remaning Monthly Spending</label>
            <input
              id="allowableSpending"
              className="small-width-input"
              onChange={this.handleSpendingChange}
              placeholder="Allowable Spending"
              type="number"
              value={this.state.allowable_spending}
            />
          </div>
        </div>
        
        <div className="daily-limit-panel__middle">
          <h3>Days Left in Month</h3>
          <div style={{fontSize: '4em'}}>{this.state.days_left}</div>
        </div>

        <div className="daily-limit-panel__right">
          <div className="daily-limit-panel__right--spd">
            <h3>Daily Spending Quota</h3>
            <div style={{fontSize: '4em'}}>{this.state.dsq_average}</div>
          </div>

          <div className="daily-limit-panel__right--submit">
            <input type="submit" value="Save"/>
          </div>
        </div>
      </form>
    )
  }
}
export default DailyLimitPanel
