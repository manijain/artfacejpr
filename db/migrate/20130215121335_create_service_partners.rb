class CreateServicePartners < ActiveRecord::Migration
  def change
    create_table :service_partners do |t|
      t.string  :salutation
      t.string  :first_name
      t.string  :last_name
      t.string  :company_name
      t.string  :street
      t.string  :zip_code
      t.string  :city
      t.string  :country
      t.string  :telephone_number
      t.string  :fax_number
      t.string  :website
      t.string  :email
      t.string  :password
      t.text    :specialities
      t.text    :description
      t.integer :number_of_employees
      t.integer :founded
      t.string  :partner_type

      t.timestamps
    end
  end
end
