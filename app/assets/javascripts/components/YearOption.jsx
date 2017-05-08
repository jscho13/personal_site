const YearOption = (props) => {
  let monthOptions = props.months.map((month) => {
    let updateDsqDateFilter = () => props.updateDsqDateFilter(month, props.year)
    return (
      <MonthOption
        month={month}
        year={props.year}
        updateDsqDateFilter={updateDsqDateFilter}/>
    )
  });

  return (
    <li>
      {props.year}
      {monthOptions}
    </li>
  )
}
