class User < ActiveRecord::Base
  has_many :events, through: :votes
  has_many :votes
end
