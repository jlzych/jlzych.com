---
name: deploy-site
description: Deploy the built jlzych.com site by committing all changes in ../jlzych.github.com and pushing to GitHub. Use when the user asks to deploy, publish, or push the site live.
tools: Bash, Read
---

This skill commits all changes in the `../jlzych.github.com` output repo and pushes them to GitHub.

## Steps

1. Check the last commit message in the current source repo (`/Users/jlzych/Sites/jlzych.com`) for context on what changed.
2. Check `git status` in `../jlzych.github.com` to confirm there are changes to commit.
3. If there are no changes, build the site in the source repo first (see "Building"), then re-check `git status` in `../jlzych.github.com`.
4. Stage all changes with `git add -A`.
5. Write a concise commit message summarizing what changed based on recent commits in the source repo.
6. Commit and push to `origin master`.

## Building

The `be` alias and a bare `bundle exec` do **not** work in a non-interactive shell. This project's gems live in the RVM gemset `ruby-2.6.5@jlzych.com` (set by `.ruby-version` + `.ruby-gemset`), but a non-interactive shell inherits RVM's *default* gemset and an exported `RBENV_VERSION`, so `middleman` falls through to an rbenv shim and fails with `rbenv: middleman: command not found`.

Always build with:

```
rvm "$(cat .ruby-version)@$(cat .ruby-gemset)" do bundle exec middleman build
```

## Commit message format

- First line: short imperative summary (under 72 chars)
- Blank line
- 1-2 sentence body explaining what was done
- Blank line

## Important notes

- Always run commands with `cd ../jlzych.github.com &&` prefix since the working directory is the source repo
- If there are no changes in `../jlzych.github.com` even after building, inform the user the site is already up to date
