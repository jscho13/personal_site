class DailyLimitPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allowable_spending: 0,
      days_left: 0,
      dsq_average: 0,
      submission_date: 0
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateDsq = this.calculateDsq.bind(this);
  }
  
  componentDidMount() {
    date = new Date();
    daysLeft = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate() + 1;
    submissionDate = moment().format('l');
    fetch('/api/budget_data', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ allowable_spending: responseJson.allowable_spending
                      , days_left: daysLeft
                      , dsq_average: (responseJson.allowable_spending/daysLeft).toFixed(2)
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
    let newDsq = (newAllowableSpending/newDaysLeft).toFixed(2);
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
      <div className="daily-limit-panel">
        <div className="daily-limit-panel__left">
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
            <label>Remainding Monthly Spending</label>
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
            <label>Days Left in Month</label>
            <input
              id="daysLeft"
              className="small-width-input"
              onChange={this.calculateDsq}
              placeholder="Days Left"
              type="number"
              value={this.state.days_left}
            />
          </div>
        </div>
        
        <div className="daily-limit-panel__right">
          <div className="daily-limit-panel__right--spd">
            <h3>Daily Quota</h3>
            <div style={{fontSize: '4em'}}>{this.state.dsq_average}</div>
          </div>

          <div className="daily-limit-panel__right--submit">
            <form onSubmit={this.handleSubmit}>
              <input type="submit" value="Save"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
