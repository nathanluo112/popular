class Event < ActiveRecord::Base
  has_many :votes
  has_many :users, through: :votes

  def self.near(latlng_bounds)
  end

end
