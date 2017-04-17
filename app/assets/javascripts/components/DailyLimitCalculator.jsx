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
  
  updateAllowable(event) {
    newAllowable = event.target.value;
    let newDsq = newAllowable/this.state.days;
    this.setState({amount: newAllowable, dsq: newDsq});
  }
  
  updateDaysLeft(event) {
    newDaysLeft = event.target.value;
    let newDsq = this.state.amount/newDaysLeft;
    this.setState({days: newDaysLeft, dsq: newDsq});
  }
  
  render() {
    return (
      <div>
        <input
          id="allowableSpending"
          type="number"
          placeholder="Allowable Spending"
          onChange={this.updateAllowable}
        />
        <input
          id="daysLeft"
          type="number"
          placeholder="Days Left in Month"
          onChange={this.updateDaysLeft}
        />
        <div>{this.state.dsq}</div>
      </div>
    )
  }
}
