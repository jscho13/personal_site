class FeaturesController < ApplicationController
  before_action :authenticate_user!
  before_action :validate_premium_access
  
  def index
    @dsqChartData = current_user.dsq_averages
  end
  
  def validate_premium_access
    if current_user.sale_id.nil?
      redirect_to premium_path
    else
      return true
    end
  end

end
