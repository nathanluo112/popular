scheduler = Rufus::Scheduler.singleton

scheduler.every '1h' do
  events_to_close = Event.where("is_active = true and created_at < ?", (Time.now - 32000));
  if events_to_close
    events_to_close.each do |event|
      event.calculate_popularity
      event.is_active = false
      event.save
    end
  end
end

scheduler.every '30m' do
  remarks_to_close = Remark.where("is_current = true and created_at < ?", (Time.now - 5400));
  if remarks_to_close
    remarks_to_close.each do |remark|
      remark.calculate_popularity
      remark.is_current = false
      remark.save
    end
  end
end
