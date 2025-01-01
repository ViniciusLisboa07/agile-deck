Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "home#index", as: :home
  devise_for :users

  get "/choose_authentication", to: "users#choose_authentication", as: :choose_authentication
  post "/anonymous_login", to: "users#anonymous_login", as: :anonymous_login

  resources :rooms, only: [ :new, :create, :show ] do
    resources :decks, only: [ :new, :create, :edit, :update ], shallow: true
  end

  get "rooms/code/:code", to: "rooms#show_by_code", as: :show_by_code

  resources :rounds do
    resources :vote, only: [ :create ]
    post "reveal_votes", to: "vote#reveal_votes", as: :reveal_votes
  end
end
