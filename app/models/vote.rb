class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :votable, polymorphic: true
  validates_uniqueness_of :user, scope: [:votable_id, :votable_type]

  before_save :add_popularity_to_votable

private
  def add_popularity_to_votable
    self.votable.score += (self.user.popularity * self.vote_direction)
    self.votable.save
  end
end
