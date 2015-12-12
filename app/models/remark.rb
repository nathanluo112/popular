class Remark < ActiveRecord::Base
  has_many :votes, as: :votable, dependent: :destroy
  belongs_to :event
  belongs_to :giver, class_name: :user
  belongs_to :receiver, class_name: :user

  has_attached_file :photo,
  styles: { medium: "300x300>", thumb: "100x100>" },
  default_url: "/images/:style/missing.png"

  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  def calculate_popularity
    if self.score > 0
      if remark_direction == 1
        self.giver.popularity += (self.score * 0.1).to_i
        self.reciever.popularity += (self.score * 0.15).to_i
      else
        self.giver.popularity += (self.score * 0.15).to_i
        self.reciever.popularity -= (self.score * 0.15).to_i
      end
    else
      if remark_direction == 1
        self.giver.popularity -= (self.score * 0.05).to_i
        self.reciever.popularity -= (self.score * 0.2).to_i
      else
        self.giver.popularity -= (self.score * 0.2).to_i
        self.reciever.popularity += (self.score * 0.2).to_i
      end
    end
    self.giver.save
    self.reciever.save
  end
end
