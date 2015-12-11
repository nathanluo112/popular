class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :popularity, default: 0
      t.string :first_name
      t.string :last_name
      t.string :gender
      t.string :facebook_id
      t.string :profile_pic_url
      t.timestamps
    end
  end
end
