# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog and portfolio website built with Middleman (Ruby static site generator). The site includes blog posts, case studies, portfolio projects, and an about page. It's deployed to `../jlzych.github.com`.

## Development Commands

- **Start dev server**: `be middleman` (runs on localhost:4567 with live reload)
- **Build for production**: `be middleman build` (output to `../jlzych.github.com`)
- **Install dependencies**: `bundle install`
- **Ruby version**: 2.6.5 (managed with rbenv)

## Project Structure

- **`source/`** - All site content (templates, posts, stylesheets, images)
  - **`posts/`** - Blog posts as Markdown files with format `YYYY-MM-DD-slug.md`
  - **`layouts/`** - ERB templates: `post_layout.erb` (blog posts), `case_study_layout.erb` (case studies)
  - **`partials/`** - Reusable ERB template components
  - **`stylesheets/`** - CSS files (split by page/section, bundled by Sprocket)
  - **`case-studies/`** - Case study content folders
  - **`projects/`** - Portfolio project folders
  - **`images/`** - Images organized by post/project
  - **`javascripts/`** - JavaScript files
  - **`fonts/`** - Custom fonts
- **`config.rb`** - Middleman configuration (blog settings, markdown engine, build options)
- **`Gemfile`** - Ruby dependencies (middleman, middleman-blog, redcarpet, etc.)

## Key Technologies & Configuration

- **Template Engine**: ERB (recently converted from HAML - see commit 2448a37)
- **Markdown Engine**: Redcarpet with fenced code blocks and smart typography
- **Blog Plugin**: middleman-blog (configured in config.rb)
  - Posts read from `source/posts/:year-:month-:day-:title.html.md`
  - Blog layout: `layouts/post_layout`
- **CSS**: Vanilla CSS files (converted from SCSS - see commit 1e668b3), bundled by Sprocket's asset pipeline
  - **`application.css`** - Main bundler for other CSS files
  - **`variables.css`** - CSS custom properties (used across all stylesheets)
  - **`base.css`**, **`normalize.css`** - Base/reset styles
  - **`homepage.css`**, **`writing.css`**, **`portfolio.css`**, **`resume.css`**, **`about.css`** - Page-specific styles
- **Directory Indexes**: Enabled (URLs without .html)
- **Cache Busting**: Enabled for build
- **LiveReload**: Enabled for development

## CSS Conventions

- **Prefer fluid solutions over breakpoints**: Use `clamp()`, `min()`, `max()`, and viewport/container query units (`vw`, `dvh`, `cqw`, `cqmin`) for responsive sizing. Reserve `@media` breakpoints for layout changes (e.g., collapsing grid columns) rather than incremental size adjustments.
- **Breakpoint values**: Small = 600px, Medium = 850px (defined in `variables.css` as `--bp-small` / `--bp-med`). Comment breakpoint media queries with `/* --bp-small */` or `/* --bp-med */`.
- **Container queries**: Use `container-type: inline-size` and `cqw`/`cqmin` units when sizing should be relative to a parent container rather than the viewport.
- **Recommend before writing**: For non-trivial CSS changes (layout restructuring, positioning strategies), present options to the user before writing code.

## Important Notes

- Output build directory is set to `../jlzych.github.com` (GitHub Pages)
- CSS minification disabled (Middleman 3's minifier doesn't support native CSS nesting)
- JavaScript minification also disabled
- Blog post images are stored in `source/images/YYYY-MM-DD-slug/` directories
- The main layout is `source/layout.erb` (master template)
- Partials directory configured for better component organization
