class UsersController < ApplicationController
  protect_from_forgery :except => [:create, :set_instagram_token]
  def create
    # user = User.find_by(facebook_id: params["facebook_id"])
    # if !user
    #   user = User.new(first_name: params["first_name"], last_name: params["last_name"], facebook_id:
    #   params["facebook_id"], profile_pic_url: params["profile_pic_url"])
    #   if user.save
    #     session[:user_id] = user.id
    #     render json: user
    #   end
    # else
    #   user.update(first_name: params["first_name"], last_name: params["last_name"],profile_pic_url: params["profile_pic_url"])
    #   session[:user_id] = user.id
    #   render json: user
    # end
    user = User.find_or_create_by(facebook_id: params["facebook_id"])
    user.assign_attributes(first_name: params["first_name"], last_name: params["last_name"],profile_pic_url: params["profile_pic_url"])
    user.save if user.changed?
    session[:user_id] = user.id
    render json: user
  end


  def logout
    res="";
    if logged_in?
      res = "reload"
    end
    session.clear
    render text: res
  end

  def show
    @user = User.find(params[:id])
  end

  def get_user_data
    @user = User.find(params[:id])
    render json: @user.to_json(:include=> {:events=>{}, :votes=>{}, :remarks_made=>{:include=>{:receiver=>{}, :event=>{}}}, :remarks_received=>{:include=>{:giver=>{}, :event=>{}}}})
  end

  def test_user_login
    render "test_user_login", locals: {current_user: current_user}
  end

  def search
    users = User.where("lower(first_name) LIKE ? OR lower(last_name) LIKE ? OR lower(concat(first_name,' ',last_name)) LIKE ?", "%#{params[:name].downcase}%", "%#{params[:name].downcase}%", "%#{params[:name].downcase}%");
    render json: users
  end

  def instragram_signin
    if !!session[:instagram_token]
      redirect_to "/users/#{current_user.id}"
    end
  end

  def get_instagram_token
    if session[:instagram_token]
      render json: session[:instagram_token].to_json
    else
      render text: "No instagram"
    end
  end

  def set_instagram_token
    session[:instagram_token] = params[:token]
    render json: session[:instagram_token].to_json
  end

  def popularity
    render json: {userPopularity: current_user.popularity}
  end


end
