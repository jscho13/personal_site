const MonthOption = (props) => {
  return (
    <li>
      {props.month}
      <button type="button" onClick={props.updateDsqDateFilter}>Select Me!</button>
    </li>
  )
}
