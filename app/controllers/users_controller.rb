class UsersController < ApplicationController
  def create
    user = User.find_by(facebook_id: params["facebook_id"])
    if !user
      user = User.new(first_name: params["first_name"], last_name: params["last_name"], facebook_id:
      params["facebook_id"], profile_pic_url: params["profile_pic_url"])
      if user.save
        session[:user_id] = user.id
      end
    else
      user.update(first_name: params["first_name"], last_name: params["last_name"],profile_pic_url: params["profile_pic_url"])
      session[:user_id] = user.id
    end
  end


  def logout
    session.clear
    render text: "L"
  end

  def show

  end


end
