class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :place_id
      t.string :address
      t.string :venue_name, null: false
      t.integer :score
      t.boolean :is_active, default: true

      t.timestamps null: false
    end
  end
end
