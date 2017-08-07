const AnnualBudgetForm = (props) => {
  return (
    <form onSubmit={props.addBudgetItem}>
      <input
        id="budgetInputLabel"
        placeholder="Label"
        type="text"
        value={props.label}
      />
      <input
        id="budgetInputAmount"
        placeholder="Amount"
        type="number"
        value={props.amount}
      />
      <input type="submit" value="Add to List" />
    </form>
  )
}
