class Post < ActiveRecord::Base
  attr_accessor :body, :title
  
  has_many :comments
  
  validates_presence_of :body, :title
end
