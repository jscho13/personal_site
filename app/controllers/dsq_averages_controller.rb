class DsqAveragesController < ApplicationController
  def create
    @dsqAverage = DsqAverage.new(dsq_params)
    @dsqAverage.user = current_user
    if @dsqAverage.save
      flash.notice = "Saved!"
    else
      flash.notice = @dsqAverage.errors.full_messages.join(". ")
      render json: @dsqAverage.errors, status: :unprocessable_entity
    end
  end
  
  private

  def dsq_params
    params.permit(:dsq_average, :allowable_spending, :days_left)
  end
end
