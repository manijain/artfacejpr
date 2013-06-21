Given /^the following user records$/ do |table|
  users = []
  table.hashes.each do |user_data|
    users << User.create!(user_data)
  end
end

Given /^the following admin records$/ do |table|
  admin_users = []
  table.hashes.each do |user_data|
    admin_users << AdminUser.create!(user_data)
  end
end

When /^I go to the (.+)$/ do |page_name|
  visit path_to(page_name)
end

When /^I fill in the following records$/ do |table|
  table.hashes.each do |admin_data|
    fill_in :admin_user_email,    :with => admin_data[:admin_user_email]
    fill_in :admin_user_password, :with => admin_data[:admin_user_password]
  end
end

When /^I click on (.*)$/ do |button|
  click_button button
end

Then /^I should see the users list with (.*)$/ do |names|
  all('td.user_first_name').each_with_index do |element, index|
    element.text.should == names.split(',')[index].split(' ')[0]
  end
  all('td.user_last_name').each_with_index do |element, index|
    element.text.should == names.split(',')[index].split(' ')[1]
  end
end