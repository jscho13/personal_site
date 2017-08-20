class BudgetItemsController < ApplicationController
  def index
    
  end
  
  def create
    if !current_user.budget.nil?
      budget = current_user.budget
      
      budgetItem = BudgetItem.new(budget_item_params[:budget_item])
      budgetItem.budget = budget
      budgetItem.save

      # if you want the sum of budget_items
      # budget.budget_items.map(&:amount).reduce(:+)
      budget.yearly_budget = budget_item_params[:yearly_budget]
      budget.save
    else
      budget = Budget.new()
      budget.yearly_budget = budget_item_params[:yearly_budget]
      budget.user = current_user
      budget.save
      
      budgetItem = BudgetItem.new(budget_item_params[:budget_item])
      budgetItem.budget = budget
      budgetItem.save
    end
  end
  
  def destroy
    
  end
  
  private

  def budget_item_params
    params.permit(:yearly_budget, budget_item: [:label, :amount])
  end
end
