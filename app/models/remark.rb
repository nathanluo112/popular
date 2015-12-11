class Remark < ActiveRecord::Base
  has_many :votes, as: :votable, dependent: :destroy
  belongs_to :event
  belongs_to :giver, class_name: :user
  belongs_to :receiver, class_name: :user

  has_attached_file :photo, 
  styles: { medium: "300x300>", thumb: "100x100>" }, 
  default_url: "/images/:style/.png"

  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/
end