class EventsController < ApplicationController
  protect_from_forgery :except => [:create]
  def index
  end

  def show
    @event = Event.find_by(id: params[:id])
    if current_user.voted_for?(@event)
      render "show"
    elsif with_in_range?(@event)
      render "show"
    else
      redirect_to root_path, flash: {alert: "Event is out of range"}
    end
  end

  def new
  end

  def create
    event = Event.new(permitted_params)
    if with_in_range?(event)
      if event.save
        Vote.create(user: current_user, votable: event, vote_direction: 1)
        render json: event.to_json
      else
        render :nothing => true, status: 422
      end
    else
      redirect_to root_path
    end
  end

  def near
    events = Event.near(params[:bound], current_user)
    render json: events.to_json
  end

  def voted
    events = current_user.voted_events
    render json: events.to_json
  end

  private
  def permitted_params
    params.require(:event).permit(:lat, :lng, :address, :venue_name, :place_id, :description, :house_party, :threshold)
  end

  def with_in_range?(event)
    if params[:current_location]
      current_lat = params[:current_location][:lat].to_f
      current_lng = params[:current_location][:lng].to_f
      lat_diff = (event.lat - current_lat).abs
      lng_diff = (event.lng - current_lng).abs
      if lat_diff < 0.0005 && lng_diff < 0.0005
        return true
      end
    end
    false
  end

end
