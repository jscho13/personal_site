class DateOptionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dateOptions = this.props.dateOptions.map((dateOption) => {
      const { months, year } = dateOption
      return (
        <YearOption
          months={months}
          year={year}
          updateDsqDateFilter={this.props.updateDsqDateFilter}/>
      )
    });

    return(
      <ul>
        {dateOptions}
      </ul>
    );
  }
};
