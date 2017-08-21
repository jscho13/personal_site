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
  
  componentDidMount() {
    fetch("/budget_items", { credentials: "same-origin" })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ budgetItems: responseJson.budgetItems,
                        yearlyBudget: responseJson.yearlyBudget
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  addBudgetItem(event) {
    event.preventDefault()
    let label = event.currentTarget.elements.budgetInputLabel.value
    let amount = event.currentTarget.elements.budgetInputAmount.value
    let annualBudget = event.currentTarget.elements.budgetInputAmount.value * 12
    let newBudgetItem = {
      label: label,
      amount: amount,
      annual_budget: annualBudget
    }
    let newBudgetItems = [...this.state.budgetItems, newBudgetItem]
    let yearlyBudget = this.sumBudgetItems(newBudgetItems)
    
    // Send out budget item create request
    $.post( "/budget_items", {
      budget_item: newBudgetItem,
      yearly_budget: yearlyBudget
    }).done(function() {
      fetch("/budget_items", { credentials: "same-origin" })
        .then(response => response.json())
        .then(responseJson => {
          newBudgetItem.id = responseJson.budgetItems.pop().id
        })
        .catch(error => {
          console.error(error);
        })
    })
    // Replace the last item because it has an id
    newBudgetItems[newBudgetItems.length-1] = newBudgetItem
    event.currentTarget.elements.budgetInputLabel.value = ''
    event.currentTarget.elements.budgetInputAmount.value = ''
        
    this.setState({
      budgetItems: newBudgetItems,
      yearlyBudget: yearlyBudget
    })
  }
  
  removeBudgetItem(removeItem) {
    let newBudgetItems = this.state.budgetItems.filter(budgetItem => {
      return budgetItem !== removeItem
    })
    let yearlyBudget = this.sumBudgetItems(newBudgetItems)
    
    // Send out budget delete request
    $.ajax({
      url: "/budget_items/"+removeItem.id,
      type: 'DELETE',
      contentType: 'application/json',
      error: function(request,msg,error) {
        console.log(request);
        console.log(error);
        console.error(msg);
      }
    })
    
    this.setState({
      budgetItems: newBudgetItems,
      yearlyBudget: yearlyBudget
    })
  }
  
  sumBudgetItems(budgetItemList) {
    let total = budgetItemList.reduce(function(a, b){ return a + b.annual_budget }, 0)
    return total
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
