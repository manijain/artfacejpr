class CreateHeaderMovies < ActiveRecord::Migration
  def up
    create_table :header_movies do |t|
      t.has_attached_file :header_movie
      t.string            :header_movie_name
      t.timestamps
    end
  end
  def down
    remove_table :header_movies
  end
end
