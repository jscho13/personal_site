class DsqDateFilterList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dateBoxes = this.props.dateOptions.map((dateOption) => {
      const { months, year } = dateOption
      return (
        <DsqDateFilterItem
          months={months}
          year={year}/>
      )
    });

    return(
      <div className="date-filter">
        {dateBoxes}
      </div>
    );
  }
};
