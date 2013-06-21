class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name,          :limit=>"40"
      t.string :concern,       :limit=>"40"
      t.string :email_address, :limit=>"40"
      t.string :phone_number,  :limit=>"20"
      t.text   :message

      t.timestamps
    end
  end
end
