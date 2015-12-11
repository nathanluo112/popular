class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :votable, polymorphic: true
  # belongs_to :event
  validates_uniqueness_of :user, scope: :votable
  belongs_to :event
  validates_uniqueness_of :user, scope: :event

  before_save :add_popularity_to_event

  private
  def add_popularity_to_event
    self.event.score += (self.user.popularity * self.vote_direction)
    self.event.save
  end
end
