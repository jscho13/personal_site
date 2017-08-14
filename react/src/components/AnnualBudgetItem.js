import React from 'react'

const AnnualBudgetItem = (props) => {
  return (
    <li className="ab-row">
      <a className="ab-row__item ab-row__item--remove-item" onClick={props.removeBudgetItem}>x</a>
      <div className="ab-row__item">{props.label}</div>
      <div className="ab-row__item">{props.amount}</div>
      <div className="ab-row__item"></div>
      <div className="ab-row__item">{props.annualAmount}</div>
    </li>
  )
}
export default AnnualBudgetItem
