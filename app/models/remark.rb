class Remark < ActiveRecord::Base
  has_many :votes, as: :votable, dependent: :destroy
  belongs_to :event
  belongs_to :giver, class_name: :user
  belongs_to :receiver, class_name: :user 
end