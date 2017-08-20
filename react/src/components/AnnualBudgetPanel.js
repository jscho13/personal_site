import React from 'react'
import AnnualBudgetForm from './AnnualBudgetForm'
import AnnualBudgetList from './AnnualBudgetList'

class AnnualBudgetPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetItems: [],
      label: 'Transportation',
      amount: '120',
      yearlyBudget: ''
    }
    
    this.addBudgetItem = this.addBudgetItem.bind(this);
    this.removeBudgetItem = this.removeBudgetItem.bind(this);
    this.sumBudgetItems = this.sumBudgetItems.bind(this);
  }

  addBudgetItem(event) {
    event.preventDefault()
    let newId = this.state.budgetItems.length + 1
    let newBudgetItem = {
      id: newId,
      label: event.currentTarget.elements.budgetInputLabel.value,
      amount: event.currentTarget.elements.budgetInputAmount.value,
      yearlyBudget: event.currentTarget.elements.budgetInputAmount.value * 12
    }
    event.currentTarget.elements.budgetInputLabel.value = ''
    event.currentTarget.elements.budgetInputAmount.value = ''
    let newBudgetItems = [...this.state.budgetItems, newBudgetItem]
    let annualBudget = this.sumBudgetItems(newBudgetItems)
    
    // Send out budget item create request
    $.post( "/budget_items", {
      budget_item: newBudgetItem,
      yearly_budget: annualBudget
    })
    
    this.setState({
      budgetItems: newBudgetItems,
      yearlyBudget: yearlyBudget
    })    
  }
  
  removeBudgetItem(id) {
    let newBudgetItems = this.state.budgetItems.filter(budgetItem => {
      return budgetItem.id !== id
    })
    let yearlyBudget = this.sumBudgetItems(newBudgetItems)
    
    // send out a delete request here
    
    this.setState({
      budgetItems: newBudgetItems,
      yearlyBudget: yearlyBudget
    })
  }
  
  sumBudgetItems(budgetItemList) {
    let total = budgetItemList.reduce(function(a, b){ return a + b.yearlyBudget }, 0)
    return total
  }
    
  componentDidMount() {
    // this will be the index
    
    // fetch("/api/dsq_date_options", { credentials: "same-origin" })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState({ date_options: responseJson});
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  render() {
    return(
      <div id="annualBudgetContainer">
        <AnnualBudgetForm
          label={this.state.label}
          amount={this.state.amount}
          addBudgetItem={this.addBudgetItem}
        />
        <AnnualBudgetList
          budgetItems={this.state.budgetItems}
          removeBudgetItem={this.removeBudgetItem}
        />
        <hr/>
        <div className="ab-row">
          <div className="ab-row__item">&nbsp;</div>
          <label className="ab-row__item">Sum</label>
          <div className="ab-row__item">&nbsp;</div>
          <div className="ab-row__item">&nbsp;</div>
          <div className="ab-row__item">{this.state.yearlyBudget}</div>
        </div>
      </div>
    );
  }
};
export default AnnualBudgetPanel
