class User < ActiveRecord::Base
  has_many :events, through: :votes
  has_many :votes

  def voted_for?(event)
    Vote.where(user: self, votable: event).count > 0
  end
end