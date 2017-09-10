class DsqAveragesController < ApplicationController
  def create
    submission_date = Date.strptime(dsq_params[:submission_date], "%m %d %Y")
    if current_user.dsq_averages.where(["submission_date = ?", submission_date]).any?
      @dsqAverage = DsqAverage.where(["submission_date = ?", submission_date])[0]
      @dsqAverage.allowable_spending = dsq_params[:allowable_spending]
      @dsqAverage.dsq_average = dsq_params[:dsq_average]
      @dsqAverage.days_left = dsq_params[:days_left]
      current_user.update_attribute(:monthly_budget, dsq_params[:monthly_budget])
    else
      hash_dsq_params = dsq_params.to_h
      hash_dsq_params[:submission_date] = submission_date
      monthly_budget = hash_dsq_params.delete("monthly_budget")
      current_user.monthly_budget = monthly_budget
      @dsqAverage = DsqAverage.new(hash_dsq_params)
      @dsqAverage.user = current_user
    end
    if @dsqAverage.save
      flash.notice = "Saved!"
      # render "features/index"
    else
      flash.alert = @dsqAverage.errors.full_messages.join(". ")
      render json: @dsqAverage.errors, status: :unprocessable_entity
    end
  end
  
  private

  def dsq_params
    params.permit(:allowable_spending, :dsq_average, :days_left, :submission_date, :monthly_budget)
  end
end
