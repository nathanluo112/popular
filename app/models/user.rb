class User < ActiveRecord::Base
  has_many :events, through: :votes
  has_many :votes

  def voted_for?(event)
    Vote.where(user: self, votable: event).count > 0
  end

  def vote_direction_for(event)
    Vote.find_by(user: self, votable: event).vote_direction
  end

  def remarked_on?(receiver)
    Remark.where(giver_id: self.id, receiver_id: receiver.id) > 0
  end

end