class AddThresholdToEvents < ActiveRecord::Migration
  def change
    add_column :events, :threshold, :integer, default: 0
  end
end
