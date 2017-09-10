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
      monthly_budget: 0,
      submission_date: moment(),
      correct_dsq_average: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSpendingChange = this.handleSpendingChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.dollarFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })
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
                      , dsq_average: this.dollarFormatter.format((responseJson.allowable_spending/daysLeft).toFixed(2))
                      , monthly_budget: responseJson.monthly_budget });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSpendingChange(event) {
    let newAllowableSpending = event.target.value;
    let newDsq = (newAllowableSpending/this.state.days_left);
    this.setState({ allowable_spending: newAllowableSpending
                  , dsq_average: this.dollarFormatter.format(newDsq) });
  }

  handleDateChange(date) {
    let end = moment().endOf('month');
    let newDaysLeft = end.diff(date, 'days') + 1;
    let newDsq = (this.state.allowable_spending/newDaysLeft);
    this.setState({ submission_date: date
                  , days_left: newDaysLeft
                  , dsq_average: this.dollarFormatter.format(newDsq) });
  }
  
  handleBudgetChange(event) {
    let newMonthlyBudget = event.target.value;
    let newCorrectDsqAverage = (newMonthlyBudget/this.state.days_left);
    this.setState({ monthly_budget: newMonthlyBudget
                  , correct_dsq_average: this.dollarFormatter.format(newCorrectDsqAverage) });
    
  }

  handleSubmit(event) {
    event.preventDefault();
    $.post( "/dsq_averages", {
      allowable_spending: this.state.allowable_spending,
      days_left: this.state.days_left,
      dsq_average: this.state.dsq_average,
      monthly_budget: this.state.monthly_budget,
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
            <label>Monthly Budget</label>
            <input
              id="monthlySpending"
              className="small-width-input"
              onChange={this.handleBudgetChange}
              placeholder="Monthly Budget"
              type="number"
              value={this.state.monthly_budget}
            />
          </div>
          <div>
            <label>Remaining Budget</label>
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
        {this.state.correct_dsq_average}
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
