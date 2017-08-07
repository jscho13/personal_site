Rails.application.routes.draw do
  mount Payola::Engine => '/payola', as: :payola
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users

  root to: "homes#landing"

  get 'about', to: 'homes#about'
  get 'premium_access', to: 'homes#premium_access'
  get 'features', to: 'features#index'

  scope '/api' do
    get 'dsq_month_data', to: 'features#dsq_month_data'
    get 'dsq_date_options', to: 'features#dsq_date_options'
    get 'user_budget_data', to: 'features#user_budget_data'
  end

  resources :dsq_averages
  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable
end
