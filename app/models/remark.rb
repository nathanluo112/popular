class Remark < ActiveRecord::Base
  has_many :votes, as: :votable, dependent: :destroy
  belongs_to :event
  belongs_to :giver, class_name: :User
  belongs_to :receiver, class_name: :User


  has_attached_file :photo,
  styles: { medium: "300x300>", thumb: "100x100>" },
  default_url: "missing.png"

  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  def already_has_vote_from(user)
    self.votes.where(user_id: user.id).count > 0
  end

  def calculate_popularity
    if self.score > 0
      if self.remark_direction == 1
        self.giver.popularity += (self.score * 0.1).to_i
        self.receiver.popularity += (self.score * 0.15).to_i
      else
        self.giver.popularity += (self.score * 0.15).to_i
        self.receiver.popularity -= (self.score * 0.15).to_i
      end
    else
      if self.remark_direction == 1
        self.giver.popularity += (self.score * 0.05).to_i
        self.receiver.popularity += (self.score * 0.2).to_i
      else
        self.giver.popularity += (self.score * 0.2).to_i
        self.receiver.popularity -= (self.score * 0.2).to_i
      end
    end
    self.giver.save
    self.receiver.save
  end
end
