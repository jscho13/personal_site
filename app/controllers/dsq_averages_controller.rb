class DsqAveragesController < ApplicationController
  def create
    @dsqAverage = DsqAverage.new(dsq_params)
    @dsqAverage.user = current_user
    if @dsqAverage.save
      flash.notice = "Saved!"
      render "features/index"
    else
      flash.notice = @dsqAverage.errors.full_messages.join(". ")
      render json: @dsqAverage.errors, status: :unprocessable_entity
    end
  end
  
  def dsq_chart_data
    data = Hash.new
    dsq_array = current_user.dsq_averages.to_ary
    data[:labels] = dsq_array.map { |x| x.id }
    data[:datasets] = [
      {
        label: "Daily Spending Quota History",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dsq_array.map { |x| x.dsq_average },
        spanGaps: false
      }
    ]
    render json: data
  end
  
  private

  def dsq_params
    params.permit(:dsq_average, :allowable_spending, :days_left)
  end
end
