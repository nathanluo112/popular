scheduler = Rufus::Scheduler.singleton

scheduler.every '30m' do
  events_to_close = Event.where("is_active = true and created_at < ?", (Time.now));
  if events_to_close
    events_to_close.each do |event|
      event.calculate_popularity
      event.is_active = false
      event.save
    end
  end
end
