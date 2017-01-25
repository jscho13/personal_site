class HomesController < ApplicationController
  
  def blog
    redirect_to "/index.html"
  end

  def about
    render "homes/about", :layout => false
  end  

end
