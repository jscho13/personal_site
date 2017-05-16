class DsqAveragesController < ApplicationController
  def create
    submission_date = Date.strptime(dsq_params[:submission_date], "%m/%d/%Y")
    if DsqAverage.where(["submission_date = ?", submission_date]).any?
      @dsqAverage = DsqAverage.where(["submission_date = ?", submission_date])[0]
      @dsqAverage.dsq_average = dsq_params[:dsq_average]
      @dsqAverage.allowable_spending = dsq_params[:allowable_spending]
      @dsqAverage.days_left = dsq_params[:days_left]
    else
      @dsqAverage = DsqAverage.new(dsq_params)
      @dsqAverage.submission_date = submission_date
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
    params.permit(:dsq_average, :allowable_spending, :days_left, :submission_date, :authenticity_token)
  end
end
