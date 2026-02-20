###
# Blog settings
###

Time.zone = "America/Los_Angeles"
I18n.enforce_available_locales = false

activate :blog do |blog|
  # blog.prefix = "blog"
  # blog.permalink = ":year/:month/:day/:title.html"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = ":year.html"
  # blog.month_link = ":year/:month.html"
  # blog.day_link = ":year/:month/:day.html"
  # blog.per_page = 5
  # blog.taglink = "tags/:tag.html"

  blog.sources = "posts/:year-:month-:day-:title.html"
  blog.layout = "layouts/post_layout"
  blog.default_extension = ".md"
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"
  blog.paginate = true
  blog.page_link = ":num"
end

set :markdown_engine, :redcarpet
set :markdown,
  :fenced_code_blocks => true,
  :smartypants => true,
  :with_toc_data => true
# To generate TOC https://github.com/vmg/redcarpet/pull/186#issuecomment-22783188

page "/feed.xml", :layout => false
activate :directory_indexes

set :build_dir, "../jlzych.github.com"
set :partials_dir, "partials"

activate :livereload
activate :syntax

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

ENV['THOR_SILENCE_DEPRECATION'] = '1'
