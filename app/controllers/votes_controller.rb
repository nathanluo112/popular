class VotesController < ApplicationController
  
  def create
    # I wouldn't assign in a ternary. Do something like
    # votable = params[:remark_id] ? Remark.find(params[:remark_id]) : Event.find(params[:event_id])
    # or do if / else / end

    params[:remark_id] ? votable = Remark.find(params[:remark_id]) : votable = Event.find(params[:event_id])
    vote = Vote.new(permit_params.merge(user: current_user, votable: votable))
    if vote.save
      render text: "#{vote.vote_direction}"
    else
      render text: "You've managed to mess up clicking."
    end
  end

private
  def permit_params
    params.require(:vote).permit(:vote_direction)
  end
end