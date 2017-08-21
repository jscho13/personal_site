import React from 'react'
import AnnualBudgetItem from './AnnualBudgetItem'

class AnnualBudgetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let budgetItems = this.props.budgetItems.map((budgetItem) => {
      const { id, label, amount, annual_budget } = budgetItem
      let removeBudgetItem = () => this.props.removeBudgetItem(budgetItem)

      return (
        <AnnualBudgetItem
          key={id}
          id={id}
          label={label}
          amount={amount}
          annualBudget={annual_budget}
          removeBudgetItem={removeBudgetItem}/>
      )
    });

    return(
      <ul className="ab-list">
        {budgetItems}
      </ul>
    );
  }
}

export default AnnualBudgetList
