const AnnualBudgetItem = (props) => {
  return (
    <li>
      <div>{props.label}</div>
      <div>{props.amount}</div>
      <button type="button" onClick={props.removeBudgetItem}>Delete</button>
    </li>
  )
}
