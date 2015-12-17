class User < ActiveRecord::Base
  has_many :events, through: :votes, source: :votable, source_type: "Event"
  has_many :votes, dependent: :destroy
  has_many :remarks_made, foreign_key: "giver_id", class_name: "Remark"
  has_many :remarks_received, foreign_key: "receiver_id", class_name: "Remark"


  def voted_for?(event)
    Vote.where(user: self, votable: event).count > 0
  end


  def vote_direction_for(event)
    Vote.find_by(user: self, votable: event).vote_direction
  end

  def remarked_on?(receiver)
    Remark.where(giver_id: self.id, receiver_id: receiver.id) > 0
  end

  def voted_events
    sql = "select events.*, votes.vote_direction from events inner join votes on votes.votable_id = events.id where events.is_active = true and votes.user_id = #{self.id}"
    ActiveRecord::Base.connection.execute(sql).entries
  end

  def has_remarked_on?(user, event)
    remarks_made.where(receiver: user, event: event).exists?
  end

  def last_upvoted_at
    self.votes.where(vote_direction: 1).last.created_at
  end

end
