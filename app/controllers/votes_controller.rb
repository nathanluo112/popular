class VotesController < ApplicationController
  
  def create
    vote = Vote.new(permit_params)
    # binding.pry
    if vote.save
      render text: "You've totally just put your rep on the line, person."
    else
      render text: "You've managed to mess up clicking."
    end
  end

private
  def permit_params
    params.require(:vote).permit(:vote_direction).merge(user_id: 1, event_id: params[:event_id])
  end
end