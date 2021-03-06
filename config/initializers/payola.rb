Payola.configure do |config|
  config.send_email_for :receipt, :admin_receipt

  if ENV["RAILS_ENV"] == "development" || ENV["RAILS_ENV"] == "test"
    config.secret_key = 'sk_test_kX7g56t4EViisURoZze6iq9O'
    config.publishable_key = 'pk_test_FLS9hTja1Bbd8nChgS9BLPn8'
  end

  if ENV["RAILS_ENV"] == "production"
    config.secret_key = ENV["LIVE_STRIPE_SECRET_KEY"]
    config.publishable_key = ENV["LIVE_STRIPE_PUBLISHABLE_KEY"]
  end

  # Example subscription:
  # 
  # config.subscribe 'payola.package.sale.finished' do |sale|
  #   EmailSender.send_an_email(sale.email)
  # end
  # 
  # In addition to any event that Stripe sends, you can subscribe
  # to the following special payola events:
  #
  #  - payola.<sellable class>.sale.finished
  #  - payola.<sellable class>.sale.refunded
  #  - payola.<sellable class>.sale.failed
  #
  # These events consume a Payola::Sale, not a Stripe::Event

  # Keep this subscription unless you want to disable refund handling
  config.subscribe 'charge.refunded' do |event|
    sale = Payola::Sale.find_by(stripe_id: event.data.object.id)
    sale.refund! unless sale.refunded?
  end
  
  config.charge_verifier = lambda do |sale, custom_fields|
    customer = User.find(custom_fields[:user_id]) 
    customer.sale_id = sale.guid
    customer.save!
    sale.owner = customer
    sale.save!
  end
  
end
