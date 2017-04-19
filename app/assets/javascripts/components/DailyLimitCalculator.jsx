class DailyLimitCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      days: 0,
      dsq: 0
    }
    
    this.updateAllowable = this.updateAllowable.bind(this);
    this.updateDaysLeft = this.updateDaysLeft.bind(this);
  }
  
  componentDidMount() {
    date = new Date();
    daysLeft = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate();
    this.setState({days: daysLeft})
  }
  
  updateAllowable(event) {
    newAllowable = event.target.value;
    let newDsq = newAllowable/this.state.days;
    this.setState({dsq: newDsq, amount: newAllowable});
  }
  
  updateDaysLeft(event) {
    newDaysLeft = event.target.value;
    let newDsq = this.state.amount/newDaysLeft;
    this.setState({dsq: newDsq, days: newDaysLeft});
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
            value={this.state.days}
            onChange={this.updateDaysLeft}
            className="half-width"
          />
        </div>
        <div>
          <label>Spending Per Day</label>
          <div>{this.state.dsq}</div>
        </div>
      </div>
    )
  }
}
