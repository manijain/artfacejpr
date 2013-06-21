module NavigationHelpers
  def path_to(page_name)
    case page_name
    when /the homepage/
      '/'
    when /users section in admin panel/
      '/admin/users/'
    when /admin login page/
      '/admin/login/'
    else
      raise "Can't find mapping from \"#{page_name}\" to a path.\n"
    end
  end
end
World(NavigationHelpers)