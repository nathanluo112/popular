class Event < ActiveRecord::Base
  has_many :votes, as: :votable, dependent: :destroy
  has_many :remarks, dependent: :destroy
  has_many :users, through: :votes
  validates_uniqueness_of :lat, scope: [:lng, :venue_name, :is_active], if: :is_active

  def self.near(bound, user)
    where("lat < ? and lat > ? and lng < ? and lng > ? and is_active = true and threshold <= ?", bound["maxlat"].to_f, bound["minlat"].to_f, bound["maxlng"].to_f, bound["minlng"].to_f, user.popularity).order(score: :desc).limit(25)
  end

  def self.end_all_active_events
    self.where(is_active: true).each do |event|
      event.end
    end
  end

  def attendees
    self.votes.where(vote_direction: 1).map {|vote| vote.user}
  end

  def end
    self.calculate_popularity
    self.is_active = false
    self.save
  end

  def most_pop_user
    self.users.order(:popularity).last
  end

  def calculate_popularity
    positive_votes = self.votes.where(vote_direction: 1)
    num_of_attendees = positive_votes.count
    attendees = positive_votes.map {|vote| vote.user}

    popularity_array = attendees.map {|attendee| attendee.popularity}
    popularity_of_most_popular = popularity_array.max

    dissers = self.votes.where(vote_direction: -1).map {|vote| vote.user}

    if positive_votes.count > 9 && self.score > 0
      ninetieth_percentile = (num_of_attendees * 0.1).to_i
      eightieth_percentile = (num_of_attendees * 0.2).to_i
      seventieth_percentile = (num_of_attendees * 0.3).to_i
      sixtieth_percentile = (num_of_attendees * 0.4).to_i
      fiftieth_percentile = (num_of_attendees * 0.5).to_i

      attendees[0].popularity += (self.score * 0.1)
      attendees[1..ninetieth_percentile].each {|u| u.popularity += (self.score * 0.08).to_i}
      attendees[(ninetieth_percentile + 1)..eightieth_percentile].each {|u| u.popularity += (self.score * 0.07).to_i}
      attendees[(eightieth_percentile + 1)..seventieth_percentile].each {|u| u.popularity += (self.score * 0.06).to_i}
      attendees[(seventieth_percentile + 1)..sixtieth_percentile].each {|u| u.popularity += (self.score * 0.05).to_i}
      attendees[(sixtieth_percentile + 1)..fiftieth_percentile].each {|u| u.popularity += (self.score * 0.04).to_i}
      attendees[(fiftieth_percentile + 1)..-1].each {|u| u.popularity += (self.score * 0.03).to_i}

    elsif positive_votes.count > 2 && self.score > 0
      attendees.each {|u| u.popularity += (popularity_of_most_popular * 0.1).to_i}

    else
      attendees.each {|attendee| attendee.popularity = (attendee.popularity * 0.9).to_i}
      dissers.each {|disser| disser.popularity += (popularity_of_most_popular * 0.1).to_i}

      dissers.each {|u| u.save}
    end

    attendees.each {|u| u.save}
  end
end
