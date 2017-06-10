class HomesController < ApplicationController
  def landing
    render "homes/landing"    
  end

  def about
    render "homes/about"
  end
  
  def premium_access
    render "homes/premium_access"
  end
end
