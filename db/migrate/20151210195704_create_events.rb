class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :latlng, null: false
      t.string :address
      t.string :venue_name, null: false
      t.integer :final_score, null: false
      t.timestamps null: false
    end
  end
end
