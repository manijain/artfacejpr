class CreateAdminInvitations < ActiveRecord::Migration
  def change
    create_table :admin_invitations do |t|
      t.string :name
      t.string :email
      t.string :password
      t.integer :admin_user_id

      t.timestamps
    end
  end
end
