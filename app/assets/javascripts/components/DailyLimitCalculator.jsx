class DailyLimitCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      days: 30,
      dsq: 0
    }
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    let newDsq = event.target.value;
  }
  
  render() {
    return (
      <div>
        <input
          type="number"
          placeholder="Allowable Spending"
          onChange={this.handleChange}
        />
        <input
          type="number"
          placeholder="Days Left in Month"
          onChange={this.handleChange}
        />
        <div>{this.state.dsq}</div>
      </div>
    )
  }
}
