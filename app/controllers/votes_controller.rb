class VotesController < ApplicationController
  
  def create
    event = Event.find(params[:event_id])
    vote = Vote.new(permit_params.merge(user: current_user, votable: event))
    binding.pry
    if vote.save
      render text: "You've totally just put your rep on the line, person."
    else
      render text: "You've managed to mess up clicking."
    end
  end

private
  def permit_params
    params.require(:vote).permit(:vote_direction)
  end
end