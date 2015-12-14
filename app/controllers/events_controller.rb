class EventsController < ApplicationController
  def index
  end

  def show
    @event = Event.find_by(id: params[:id]) || Event.find(3)
    if with_in_range?(@event)
      render "show"
    else
      redirect_to root_path, flash: {alert: "Event is out of range"}
    end
  end

  def new
  end

  def create
    event_params = permitted_params.merge(score: 0)
    event = Event.new(event_params)
    if with_in_range?(event)
      if event.save
        Vote.create(user: current_user, votable: event, vote_direction: 1)
        render json: event.to_json
      else
        render :nothing => true, status: 400
      end
    else
      redirect_to root_path
    end
  end

  def near
    events = Event.near(params[:bound])
    render json: events.to_json
  end

  private
  def permitted_params
    params.require(:event).permit(:lat, :lng, :address, :venue_name, :place_id)
  end

  def with_in_range?(event)
    if params[:current_location]
      current_lat = params[:current_location][:lat].to_f
      current_lng = params[:current_location][:lng].to_f
      lat_diff = (event.lat - current_lat).abs
      lng_diff = (event.lng - current_lng).abs
      if lat_diff < 0.0002 || lng_diff < 0.0002
        return true
      end
    end

    false
  end

end
