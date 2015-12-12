class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.belongs_to :user, null: false
      t.references :votable, polymorphic: true, index: true
      t.integer :vote_direction, null: false

      t.timestamps null: false
    end
  end
end
