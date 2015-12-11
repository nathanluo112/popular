class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :lat, null: false
      t.string :lng, null: false
      t.string :address
      t.string :venue_name, null: false
      t.integer :score, null: false
      t.timestamps null: false
    end
  end
end
