class DailyLimitCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allowable_spending: 0,
      days_left: 0,
      dsq_average: 0
    }
    
    // this.submitDsqAverage = this.submitDsqAverage.bind(this);
    this.updateAllowable = this.updateAllowable.bind(this);
    this.updateDaysLeft = this.updateDaysLeft.bind(this);
  }
  
  componentDidMount() {
    date = new Date();
    daysLeft = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate();
    this.setState({days_left: daysLeft})
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
  
  render() {
    return (
      <div className="daily-spending-calc">
        <div>
          <label>Allowable Spending</label>
          <input
            id="allowableSpending"
            type="number"
            placeholder="Allowable Spending"
            onChange={this.updateAllowable}
            className="half-width"
          />
        </div>
        <div>
          <label>Days Left</label>
          <input
            id="daysLeft"
            type="number"
            placeholder="Days Left"
            value={this.state.days_left}
            onChange={this.updateDaysLeft}
            className="half-width"
          />
        </div>
        <div>
          <label>Spending Per Day</label>
          <div>{this.state.dsq_average}</div>
        </div>
        <form action="/dsq_averages" method="post">
          <input type='hidden' name='authenticity_token' value={this.props.authenticity_token}></input>
          <input type='hidden' name='allowable_spending' value={this.state.allowable_spending}></input>
          <input type='hidden' name='days_left' value={this.state.days_left}></input>
          <input type='hidden' name='dsq_average' value={this.state.dsq_average}></input>
          <input type="submit" value="Save"/>
        </form>
      </div>
    )
  }
}
