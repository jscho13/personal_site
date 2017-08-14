import React from 'react'
import DsqDateFilterItem from './DsqDateFilterItem'

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
      <div className="dsq-date-filter">
        {dateBoxes}
      </div>
    );
  }
};
export default DsqDateFilterList
