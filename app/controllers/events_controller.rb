class EventsController < ApplicationController
  def index
  end

  def show
    @event = Event.first
  end

  def near
    events = Event.near(params[:latlng_bounds]);
    render json: events.to_json
  end

  def new
  end

  def create
  end

  def near
    events = Event.near(params[:bound])
    render json: events.to_json
  end
end