class DateFilterOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.updateDsqDateFilter(event.target.value, this.props.year);
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
      <div className="date-filter--option">
        <label>{this.props.year}</label>
        <select className="select-style" onClick={this.handleChange}>
          {monthOptions}
        </select>
      </div>
    );
  }
}
