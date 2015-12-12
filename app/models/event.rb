class Event < ActiveRecord::Base
  has_many :votes, as: :votable, dependent: :destroy
  has_many :remarks
  has_many :users, through: :votes
  validates_uniqueness_of :lat, scope: :lng

  def self.near(bound)
    where("lat < ? and lat > ? and lng < ? and lng > ?", bound["maxlat"].to_f, bound["minlat"].to_f, bound["maxlng"].to_f, bound["minlng"].to_f).limit(25)
  end

  scheduler = Rufus::Scheduler.new

  scheduler.every '1h' do
    events_to_close = Event.where("is_active = true and created_at < ?", (Time.now - 30000));
    events_to_close.each do |event|
      event.calculate_popularity
      event.is_active = false
      event.save
    end
  end


  # at 5AM
  def calculate_popularity
    positive_votes = self.votes.where(vote_direction: 1)
    num_of_attendees = positive_votes.count
    attendees = positive_votes.map {|vote| vote.user}

    ninetieth_percentile = (num_of_attendees * 0.1).to_i
    eightieth_percentile = (num_of_attendees * 0.2).to_i
    seventieth_percentile = (num_of_attendees * 0.3).to_i
    sixtieth_percentile = (num_of_attendees * 0.4).to_i
    fiftieth_percentile = (num_of_attendees * 0.5).to_i

    attendees[0].popularity += (self.score * 0.1)
    attendees[1..ninetieth_percentile].each {|u| u.popularity += (self.score * 0.08)}
    attendees[(ninetieth_percentile + 1)..eightieth_percentile].each {|u| u.popularity += (self.score * 0.07)}
    attendees[(eightieth_percentile + 1)..seventieth_percentile].each {|u| u.popularity += (self.score * 0.06)}
    attendees[(seventieth_percentile + 1)..sixtieth_percentile].each {|u| u.popularity += (self.score * 0.05)}
    attendees[(sixtieth_percentile + 1)..fiftieth_percentile].each {|u| u.popularity += (self.score * 0.04)}
    attendees[(fiftieth_percentile + 1)..-1].each {|u| u.popularity += (self.score * 0.03)}

    attendees.each {|u| u.save}
  end
end
