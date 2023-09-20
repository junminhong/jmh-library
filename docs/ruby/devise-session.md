---
slug: devise-session
title: "[ROR] 深入了解Devise世界"
tags: [ruby, ruby on rails, rails, ror, devise, session]
---

## 前言
最近剛好在跟[devise](https://github.com/heartcombo/devise)套件打交道

就順邊記錄一下整個套件到底做了哪些事情

## 什麼是devise
基於Warden開發的, 一個用於身份驗證的套件

算是ROR世界裡面蠻熱門的一個專案, 可以短時間內讓一個專案擁有基本的會員功能

主要由10個模組組成
- Database Authenticatable
- Omniauthable
- Confirmable
- Recoverable
- Registerable
- Rememberable
- Trackable
- Timeoutable
- Validatable
- Lockable

## 那要怎麼安裝呢
- 安裝devise進專案
```bash
# 將devise加進來
bundle add devise

# 產生devise相關的設定檔
rails generate devise:install
```
- 找到設定檔設定email
```ruby
# config/environments/development.rb 

config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
```
- 產生model和migration
```bash
# 注意 MODEL => 是你的model name(ex: user)
rails generate devise MODEL

# 創建資料表
rails db:migrate
```

### Controller filters and helpers
```ruby
# 可以在controller, 確保每個action都需要經過驗證
before_action :authenticate_user!

# user是否已經登入
user_signed_in?

# 當前user資料
current_user

# 這個scope的session
user_session
```

### routes
看到routes, 應該頭已經昏一半了吧, devise到底底層幫我們做好了哪些事呢

就讓筆者接著帶你深入瞭解devise
```ruby
# 如果你想複寫devise session_controller的話, 這邊記得指定到自己的controller上
devise_for :users, controllers: { session: 'users/session' }

devise_scope :user do
  delete '/sign_out' => 'users/sessions#destroy'
  post   '/sign_in' => 'users/sessions#create'
  get    '/user_sign_up' => 'users/registrations#new'
  post   '/check_registration' => 'users/registrations#check_registration'
  post   '/check_url' => 'users/registrations#check_url'
  post   '/registration' => 'users/registrations#create'
  post   '/password' => 'users/passwords#create'
end
```
## 深入瞭解devise
要先了解devise, 就要先了解[warden](https://github.com/wardencommunity/warden)這個核心套件
### SessionsController
```ruby
# devise是怎麼實作登入這件事的呢
# POST /resource/sign_in
def create
  # 透過warden認證, 會拿到resource => 等同於user
  self.resource = warden.authenticate!(auth_options)
  # 設定flash message訊息
  set_flash_message!(:notice, :signed_in)
  # resource_name => :user, resource => user_data, 傳進去sign_in function
  sign_in(resource_name, resource)
  yield resource if block_given?
  # 跳轉到登入後的頁面
  respond_with resource, location: after_sign_in_path_for(resource)
end

# DELETE /resource/sign_out
def destroy
  signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
  set_flash_message! :notice, :signed_out if signed_out
  yield if block_given?
  respond_to_on_destroy
end
```
```ruby
# lib/devise/controller/sign_in_out.rb

def sign_in(resource_or_scope, *args)
  options  = args.extract_options!
  scope    = Devise::Mapping.find_scope!(resource_or_scope)
  resource = args.last || resource_or_scope

  # 在登入後移除相關session
  expire_data_after_sign_in!

  if options[:bypass]
    ActiveSupport::Deprecation.warn(<<-DEPRECATION.strip_heredoc, caller)
    [Devise] bypass option is deprecated and it will be removed in future version of Devise.
    Please use bypass_sign_in method instead.
    Example:

      bypass_sign_in(user)
    DEPRECATION
    warden.session_serializer.store(resource, scope)
  elsif warden.user(scope) == resource && !options.delete(:force)
    # Do nothing. User already signed in and we are not forcing it.
    true
  else
    # 透過warden設置user訊息
    warden.set_user(resource, options.merge!(scope: scope))
  end
end

def sign_out(resource_or_scope = nil)
  return sign_out_all_scopes unless resource_or_scope
  scope = Devise::Mapping.find_scope!(resource_or_scope)
  user = warden.user(scope: scope, run_callbacks: false) # If there is no user

  warden.logout(scope)
  warden.clear_strategies_cache!(scope: scope)
  instance_variable_set(:"@current_#{scope}", nil)

  !!user
end
```
```ruby
# lib/devise/controller/helper.rb

def after_sign_in_path_for(resource_or_scope)
  stored_location_for(resource_or_scope) || signed_in_root_path(resource_or_scope)
end
```
看完這些source code你會發現很多地方都會使用到[warden](https://github.com/wardencommunity/warden)做session的控制

那也就是說可以來聊聊rails的session了
### rails session
Tips: 打開network application, 觀察會發現rails session會隨著每次操作都會重新更新一次

```ruby
# config/initializer/session_store.rb

# 設定一個專案的session, 過期時間為30分鐘
Rails.application.config.session_store :cookie_store, key: 'session', domain: :all, expired_after: 30.minutes
```
### 同場加映 - 如果我想要根據不同user有不同的session過期時間要怎麼做呢
文章開始前有提到一個`Timeoutable`模組, 我們可以透過這個來實作
```ruby
# app/models/user.rb

# 引用timeoutable
devise :timeoutable

def timeout_in
  # 這邊就可以根據不同權限或者成員有不同的過期時間
  1.day if user.admin?
  1.week if user.manger?
end
```
### 同場加映 - 那如果我想要在登出後根據情境到不同頁面呢
```ruby
# 首先我們要先覆寫routes.rb
devise_for :users, controllers: { session: 'users/session' }

# app/controllers/users/sessions_controller.rb

# DELETE /resource/sign_out
def destroy
  # 保留devise原本的處理邏輯
  signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
  set_flash_message!(:notice, :signed_out) if signed_out
  yield if block_given?
  # respond_to_on_destroy
  # 不使用原本的方法, 改由自己控制要去哪一個頁面
  redirect_to("/")
end

```
## 整合第三方登入
### Facebook
```bash
gem 'omniauth-facebook'

gem 'omniauth-rails_csrf_protection'

# 建立相關的migration
rails g migration AddOmniauthToUsers provider:string uid:string

# 建立資料表 
rails db:migrate
```
```ruby
# config/initializers/devise.rb
config.omniauth :facebook, "APP_ID", "APP_SECRET"
or 
config.omniauth :facebook, "APP_ID", "APP_SECRET", token_params: { parse: :json }

# app/models/user.rb
devise :omniauthable, omniauth_providers: [:facebook]

# config/routes.rb
devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }


# app/controllers/users/omniauth_callbacks_controller.rb
class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token, only: :facebook

  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication # this will throw if @user is not activated
      set_flash_message(:notice, :success, kind: "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"].except(:extra) # Removing extra as it can overflow some session stores
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
```
### Google
基本上設置大同小異
```ruby
# config/initializers/devise.rb
config.omniauth :google_oauth2, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

# app/models/user.rb
devise :omniauthable, omniauth_providers: [:google_oauth2]
```

## 參考資料
- [https://github.com/heartcombo/devise/wiki/OmniAuth:-Overview](https://github.com/heartcombo/devise/wiki/OmniAuth:-Overview)