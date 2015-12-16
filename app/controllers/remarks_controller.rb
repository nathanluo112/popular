class RemarksController < ApplicationController

  

  # Don't over-use merge with params
  def create
    remark = Remark.new(permit_params)
    remark.giver = current_user
    remark.receiver_id = params[:remark][:user_id]
    remark.event = params[:event_id]))
    # binding.pry
    if remark.save
      render text: "You've totally just put your rep on the line, person."
    else
      render text: "You've managed to mess up clicking."
    end
  end

private
  def permit_params
    params.require(:remark).permit(:remark_direction, :description, :photo)
  end

end