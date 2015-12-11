class EventsController < ApplicationController
  def index
    @events = Event.all
  end

  def show
    @events = Event.find(params[:id])
  end

  def near
    events = Event.near(params[:latlng_bounds]);
    render json: events.to_json
  end

  def new
  end

  def create
  end
end
