class ToolsController < ApplicationController
  before_action :authenticate_user!
  before_action :validate_premium_access
  
  def index
  end
  
  def validate_premium_access
    if current_user.sale_id.empty?
      return false
    else
      return true
    end
  end

end
