class BudgetItemsController < ApplicationController
  def index
    render json: { budgetItems: current_user.budget.budget_items, yearlyBudget: current_user.budget.yearly_budget }
  end
  
  def create
    if !current_user.budget.nil?
      budget = current_user.budget
      # if you want the sum of budget_items.amount
      # budget.budget_items.map(&:amount).reduce(:+)
      budget.yearly_budget = params[:yearly_budget]
      budget.save

      budgetItem = BudgetItem.new(budget_item_params)
      budgetItem.budget = budget
      budgetItem.save
    else
      budget = Budget.new()
      budget.yearly_budget = params[:yearly_budget]
      budget.user = current_user
      budget.save
      
      budgetItem = BudgetItem.new(budget_item_params[:budget_item])
      budgetItem.budget = budget
      budgetItem.save
    end
  end
  
  def destroy
    budgetItem = BudgetItem.find(params[:id])
    budgetItem.destroy
  end
  
  private

  def budget_item_params
    params.require(:budget_item).permit(:label, :amount, :annual_budget)
  end
end
