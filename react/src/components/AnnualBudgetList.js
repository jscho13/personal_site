import React from 'react'
import AnnualBudgetItem from './AnnualBudgetItem'

class AnnualBudgetList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let budgetItems = this.props.budgetItems.map((budgetItem) => {
      const { id, label, amount, yearlyBudget } = budgetItem
      let removeBudgetItem = () => this.props.removeBudgetItem(id)

      return (
        <AnnualBudgetItem
          id={id}
          label={label}
          amount={amount}
          yearlyBudget={yearlyBudget}
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
export default AnnualBudgetList
