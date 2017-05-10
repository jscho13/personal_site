const MonthOption = (props) => {
  let monthName = moment(props.month, 'M').format('MMM');

  return (
    <li>
      {monthName}
      <button type="button" onClick={props.updateDsqDateFilter}>Select Me!</button>
    </li>
  )
}
