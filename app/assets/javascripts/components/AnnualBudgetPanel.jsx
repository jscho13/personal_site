class AnnualBudgetPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetItems: [
        {id: 1, label: "Food", amount: 700},
        {id: 2, label: "Transportation", amount: 200},
        {id: 3, label: "Entertainment", amount: 600}
      ],
      label: '',
      amount: ''
    }
    
    this.addBudgetItem = this.addBudgetItem.bind(this);
    this.removeBudgetItem = this.removeBudgetItem.bind(this);
  }

  addBudgetItem(event) {
    event.preventDefault()
    let newId = this.state.budgetItems.length + 1
    let newBudgetItem = {
      id: newId,
      label: $('#budgetInputLabel').val(),
      amount: $('#budgetInputAmount').val()
    }
    let newBudgetItems = [...this.state.budgetItems, newBudgetItem]
    this.setState({
      budgetItems: newBudgetItems,
      label: '',
      amount: ''
    })
  }

  removeBudgetItem(id) {
    let newBudgetItems = this.state.budgetItems.filter(budgetItem => {
      return budgetItem.id !== id
    })
    this.setState({ budgetItems: newBudgetItems })
  }
    
  componentDidMount() {    
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
          <div className="ab-row__item">$$$$$</div>
        </div>
      </div>
    );
  }
};
