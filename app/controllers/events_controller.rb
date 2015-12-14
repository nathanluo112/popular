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
    #You might not need to merge score here if there's a default
    event_params = permitted_params.merge(score: 0)
    event = Event.new(event_params)
    #Don't leave debug code in master
    binding.pry
    if with_in_range?(event)
      if event.save
        Vote.create(user: current_user, votable: event, vote_direction: 1)
        render json: event.to_json
      else
        # 422 has become a common status for "this failed to process" - it means Unprocessable entity
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
    params.require(:event).permit(:lat, :lng, :address, :venue_name, :place_id, :description, :house_party)
  end

  # This might be better on event (it's "business logic") with some constant that defines the tolerance.
  # On the other hand, the tolerance is more about this page than the nature of an event, so maybe
  # put the within part in the model and allow it to accept a tolerance as an argument.

  def with_in_range?(event)
    if params[:current_location]
      current_lat = params[:current_location][:lat].to_f
      current_lng = params[:current_location][:lng].to_f
      lat_diff = (event.lat - current_lat).abs
      lng_diff = (event.lng - current_lng).abs
      return (lat_diff < 0.0002 && lng_diff < 0.0002)
    end
    false
  end

end
