class Vote < ActiveRecord::Base
  belongs_to :user
<<<<<<< 14b81f6ce5f19c79fc12dd53f1c22e4708068aa4
  belongs_to :votable, polymorphic: true
  # belongs_to :event
  validates_uniqueness_of :user, scope: :votable
=======
  belongs_to :event
  validates_uniqueness_of :user, scope: :event

  before_save :add_popularity_to_event

  private
  def add_popularity_to_event
    self.event.score += (self.user.popularity * self.vote_direction)
    self.event.save
  end
>>>>>>> Add methods for updating Event Score and doling out popularity points.
end
