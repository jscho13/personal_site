// change this to a class for it to work properly
const AnnualBudgetForm = (props) => {
  return (
    <form onSubmit={props.addBudgetItem}>
      <div className="ab-row">
        <div className="ab-row__item">&nbsp;</div>
        <label className="ab-row__item">Label</label>
        <label className="ab-row__item">Amount</label>
        <div className="ab-row__item">&nbsp;</div>
        <label className="ab-row__item">Yearly Budget</label>
      </div>
      <hr/>
      <div className="ab-row">
        <div className="ab-row__item">&nbsp;</div>
        <input
          id="budgetInputLabel"
          className="ab-row__item"
          style={{margin: 0}}
          placeholder={props.label}
          type="text"
        />
        <input
          id="budgetInputAmount"
          className="ab-row__item"
          placeholder={props.amount}
          type="number"
        />
        <div className="ab-row__item"><input type="submit" value="+"/></div>
        <span className="ab-row__item"></span>
      </div>
    </form>
  )
}
