Rails.application.routes.draw do
  get 'messages/index'

  root "message#index"
end
