class EventsController < ApplicationController
  def index
  end

  def show
    @event = Event.find(4)
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
