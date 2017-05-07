class FeaturesController < ApplicationController
  before_action :authenticate_user!
  # before_action :validate_premium_access
  
  def index
  end
  
  def dsq_month_data
    data = Hash.new
    dsq_array = current_user.dsq_averages.where("MONTH(submission_date) = ? and YEAR(submission_date) = ?", params[:month], params[:year])
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
  
  def budget_data
    data = Hash.new
    if current_user.dsq_averages.last
      allowable_spending = current_user.dsq_averages.last.allowable_spending
    else
      allowable_spending = 0
    end
    data[:allowable_spending] = allowable_spending
    render json: data
  end

  def validate_premium_access
    if current_user.sale_id.nil?
      redirect_to premium_access_path
    else
      return true
    end
  end

end
