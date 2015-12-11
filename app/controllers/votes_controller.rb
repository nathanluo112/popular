class VotesController < ApplicationController
  
  def create
    vote = Vote.new(permit_params)
    if vote.save
      render text: "You've totally just put your rep on the line, person."
    else
      render text: "You've managed to mess up clicking."
    end
  end

private
  def permit_params
    params.require(:vote).permit(:user_id, :event_id)
  end

end