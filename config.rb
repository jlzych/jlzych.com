activate :blog
set :blog_permalink, "projects/:title.html"
set :blog_layout_engine, "haml"
# set :blog_summary_separator, /READMORE/
# set :blog_summary_length, 500
set :build_dir, "../jlzych.github.com"

page "/feed.xml", :layout => false
activate :directory_indexes

# Build-specific configuration
configure :build do
  #set :http_prefix, "/~jlzych"
  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  activate :cache_buster
end