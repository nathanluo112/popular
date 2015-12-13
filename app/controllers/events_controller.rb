class EventsController < ApplicationController
  def index
  end

  def show
    @event = Event.find_by(id: params[:id]) || Event.find(3)
  end

  def new
  end

  def create
    event_params = permitted_params.merge(score: 0)
    event = Event.new(event_params)
    if event.save
      render json: event.to_json
    else
      render :nothing => true, status: 400
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

end
