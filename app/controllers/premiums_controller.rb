# This controller is basically for the advertising page.
class PremiumsController < ApplicationController
  before_action :authenticate_user!

  def index
  end
  
end
