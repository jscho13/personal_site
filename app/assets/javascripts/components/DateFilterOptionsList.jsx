class DateFilterOptionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dateBoxes = this.props.dateOptions.map((dateOption) => {
      const { months, year } = dateOption
      return (
        <DateFilterOption
          months={months}
          year={year}
          updateDsqDateFilter={this.props.updateDsqDateFilter}/>
      )
    });

    return(
      <div className="date-filter">
        {dateBoxes}
      </div>
    );
  }
};
