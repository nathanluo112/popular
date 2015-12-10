class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def show
  end

  def near
    events = Event.near(params[:latlng_bounds]);
    render json: events.to_json
  end
end
