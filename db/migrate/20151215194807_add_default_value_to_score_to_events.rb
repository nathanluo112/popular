class AddDefaultValueToScoreToEvents < ActiveRecord::Migration
  def change
    change_column :events, :score, :integer, default: 0
  end
end
