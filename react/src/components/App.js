import React from 'react'
import DailyLimitPanel from './DailyLimitPanel'
import DsqPanel from './DsqPanel'
import AnnualBudgetPanel from './AnnualBudgetPanel'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    return(
      <div className="container">
        <DailyLimitPanel />
        <DsqPanel />
        <AnnualBudgetPanel />
      </div>
    )
  }
}

export default App
