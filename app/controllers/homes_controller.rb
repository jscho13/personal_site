class HomesController < ApplicationController
  
  def blog
    redirect_to "/index.html"
  end

  def about
    render "homes/about"
  end
  
  def premium_access
    render "homes/premium_access"
  end

end
