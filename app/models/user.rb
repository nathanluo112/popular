class User < ActiveRecord::Base
  has_many :events, through: :votes, source: :votable, source_type: "Event"
  has_many :votes
  has_many :remarks_made, foreign_key: "giver_id", class_name: "Remark"
  has_many :remarks_received, foreign_key: "receiver_id", class_name: "Remark"


  def voted_for?(event)
    Vote.where(user: self, votable: event).count > 0
  end

  #Consider making this something like 
  #  Vote.for_event_from_user(event, self)
  def vote_direction_for(event)
    Vote.find_by(user: self, votable: event).vote_direction
  end

  #Similarly, ask Remark whether this remark exists
  def remarked_on?(receiver)
    Remark.where(giver_id: self.id, receiver_id: receiver.id) > 0
  end

end
