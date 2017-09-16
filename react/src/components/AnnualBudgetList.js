import React from 'react'
import AnnualBudgetItem from './AnnualBudgetItem'

class AnnualBudgetList extends React.Component {
  constructor(props) {
    super(props);
    
    this.dollarFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })
  }

  render() {
    let budgetItems = this.props.budgetItems.map((budgetItem) => {

      const { id, label } = budgetItem
      let amount = this.dollarFormatter.format(budgetItem.amount)
      let annual_budget = this.dollarFormatter.format(budgetItem.annual_budget)
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
      <ul className="ab-list border-bottom">
        {budgetItems}
      </ul>
    );
  }
}

export default AnnualBudgetList
