class Event < ActiveRecord::Base
  has_many :votes
  has_many :users, through: :votes

  def self.near(bound)
    where("lat < ? and lat > ? and lng < ? and lng > ?", bound["maxlat"].to_f, bound["minlat"].to_f, bound["maxlng"].to_f, bound["minlng"].to_f).limit(25)
  end

end
