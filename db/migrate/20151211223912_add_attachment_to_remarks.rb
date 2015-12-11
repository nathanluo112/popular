class AddAttachmentToRemarks < ActiveRecord::Migration
  def change
    add_attachment  :remarks, :photo
  end
end
