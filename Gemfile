source 'https://rubygems.org'

ruby '2.3.1'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
# bundle exec rake doc:rails generates the API under doc/api.
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'rails', '>= 5.0.0.rc2', '< 5.1'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'turbolinks'
 
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.4.10'

# Frontend Gems
# Use Uglifier as compressor for JavaScript assets
gem 'sass-rails', '~> 5.0'
gem 'font-awesome-sass'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'

gem 'devise'
gem 'puma'
gem 'dotenv'
gem 'jekyll'
gem 'jekyll-paginate'
gem 'jekyll-archives'
gem 'jekyll-sitemap'
gem 'jekyll-feed'
gem 'payola-payments', git: 'https://github.com/payolapayments/payola'

group :development, :test do
  gem 'pry'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :production do
  gem 'pg'
  gem 'rails_12factor'
  gem 'sprockets', '~>3.7.2'
end
