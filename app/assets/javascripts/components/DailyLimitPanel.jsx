class DailyLimitPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allowable_spending: 0,
      days_left: 0,
      dsq_average: 0,
      submission_day: 0,
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAllowable = this.updateAllowable.bind(this);
    this.updateDaysLeft = this.updateDaysLeft.bind(this);
  }
  
  componentDidMount() {
    date = new Date();
    daysLeft = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate() + 1;
    submissionDay = moment().format('l');
    fetch('/api/budget_data', {
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ allowable_spending: responseJson.allowable_spending
                      , days_left: daysLeft
                      , submission_day: submissionDay });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateSubmissionDay(event) {
    
  }
  
  updateAllowable(event) {
    newAllowable = event.target.value;
    let newDsq = newAllowable/this.state.days_left;
    this.setState({dsq_average: newDsq, allowable_spending: newAllowable});
  }
  
  updateDaysLeft(event) {
    newDaysLeft = event.target.value;
    let newDsq = this.state.allowable_spending/newDaysLeft;
    this.setState({dsq_average: newDsq, days_left: newDaysLeft});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    $.post( "/dsq_averages", {
      authenticity_token: this.props.authenticity_token,
      dsq_average: this.state.dsq_average,
      allowable_spending: this.state.allowable_spending,
      days_left: this.state.days_left,
      submission_day: this.state.submission_day
    }).done(window.location.replace("/features"));
  }

  render() {
    return (
      <div className="daily-spending-calc">
        <div>
          <label>Date</label>
          <input
            id="submissionDay"
            className="half-width"
            onChange={this.updateSubmissionDay}
            type="text"
            value={this.state.submission_day}
          />
        </div>
        <div>
          <label>Allowable Spending</label>
          <input
            id="allowableSpending"
            className="half-width"
            onChange={this.updateAllowable}
            placeholder="Allowable Spending"
            type="number"
            value={this.state.allowable_spending}
          />
        </div>
        <div>
          <label>Days Left</label>
          <input
            id="daysLeft"
            className="half-width"
            onChange={this.updateDaysLeft}
            placeholder="Days Left"
            type="number"
            value={this.state.days_left}
          />
        </div>
        <div>
          <label>Spending Per Day</label>
          <div>{this.state.dsq_average}</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Save"/>
        </form>
      </div>
    )
  }
}
