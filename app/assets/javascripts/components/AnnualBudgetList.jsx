class AnnualBudgetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let budgetItems = this.props.budgetItems.map((budgetItem) => {
      const { id, label, amount, annualAmount } = budgetItem
      let removeBudgetItem = () => this.props.removeBudgetItem(id)

      return (
        <AnnualBudgetItem
          id={id}
          label={label}
          amount={amount}
          annualAmount={annualAmount}
          removeBudgetItem={removeBudgetItem}/>
      )
    });

    return(
      <ul className="ab-list">
        {budgetItems}
      </ul>
    );
  }
};