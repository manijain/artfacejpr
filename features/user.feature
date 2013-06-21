Feature: Manage users
  In order to understand my user base better
  As an administrator
  I want to view a list of users

  Scenario:
    Given the following user records
    | user_first_name | user_last_name | email            | password | user_company    | user_street | user_zip_code | user_country | user_phone_number | user_city | user_gender |
    | John            | Doe            | john@example.org | secret   | Example Company | L - 1       | 110087        | India        | 124567890         | test_city | Male        |
    | Foo             | baz            | foo@example.org  | secret   | Example Company | L - 1       | 110087        | India        | 124567890         | test_city | Male        |
    When I go to the list of users in the admin section
    Then I should see John Doe
    And I should see Foo Baz

  @selenium
  Scenario:
   Given the following user records
   | user_first_name | user_last_name | email               | password  | user_company    | user_street | user_zip_code | user_country | user_phone_number | user_city | user_gender |
   | John            | Doe            | johndoe@example.org | qwerty!23 | Example Company | L - 1       | 110087        | India        | 124567890         | test_city | Male        |
   | Foo             | Baz            | foobaz@example.org  | qwerty!23 | Example Company | L - 1       | 110087        | India        | 124567890         | test_city | Male        |
   And the following admin records
   | email             | password |
   | admin@example.com | password |
   When I go to the admin login page
   And I fill in the following records
   | admin_user_email  | admin_user_password |
   | admin@example.com | password            |
   And I click on Login
   Then I go to the users section in admin panel
   And I should see the users list with John Doe, Foo Baz