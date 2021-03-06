class CreateRemarks < ActiveRecord::Migration
  def change
    create_table :remarks do |t|
      t.string      :description, null: false , limit: 200
      t.belongs_to  :event
      t.integer     :giver_id
      t.integer     :receiver_id
      t.integer     :remark_direction, null: false
      t.integer     :score, default: 0
      t.boolean     :is_current, default: true

      t.timestamps null: false
    end
  end
end
