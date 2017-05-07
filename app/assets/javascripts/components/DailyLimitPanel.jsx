class DailyLimitPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allowable_spending: 0,
      days_left: 0,
      dsq_average: 0,
      submission_date: 0,
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateDsq = this.calculateDsq.bind(this);
  }
  
  componentDidMount() {
    date = new Date();
    daysLeft = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate() + 1;
    submissionDate = moment().format('l');
    fetch('/api/budget_data', {
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ allowable_spending: responseJson.allowable_spending
                      , days_left: daysLeft
                      , dsq_average: responseJson.allowable_spending/daysLeft
                      , submission_date: submissionDate });
      })
      .catch(error => {
        console.error(error);
      });
  }

  calculateDsq(event) {
    let newAllowableSpending = $('#allowableSpending')[0].value;
    let newDaysLeft = $('#daysLeft')[0].value;
    let newSubmissionDate = $('#submissionDate')[0].value;
    let newDsq = newAllowableSpending/newDaysLeft;
    this.setState({ allowable_spending: newAllowableSpending
                  , days_left: newDaysLeft
                  , dsq_average: newDsq
                  , submission_date: newSubmissionDate });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    $.post( "/dsq_averages", {
      authenticity_token: this.props.authenticity_token,
      allowable_spending: this.state.allowable_spending,
      days_left: this.state.days_left,
      dsq_average: this.state.dsq_average,
      submission_date: this.state.submission_date
    }).done(window.location.replace("/features"));
  }

  render() {
    return (
      <div className="daily-spending-calc">
        <div>
          <label>Date</label>
          <input
            id="submissionDate"
            className="small-width-input"
            onChange={this.calculateDsq}
            type="text"
            value={this.state.submission_date}
          />
        </div>
        <div>
          <label>Allowable Spending</label>
          <input
            id="allowableSpending"
            className="small-width-input"
            onChange={this.calculateDsq}
            placeholder="Allowable Spending"
            type="number"
            value={this.state.allowable_spending}
          />
        </div>
        <div>
          <label>Days Left</label>
          <input
            id="daysLeft"
            className="small-width-input"
            onChange={this.calculateDsq}
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
