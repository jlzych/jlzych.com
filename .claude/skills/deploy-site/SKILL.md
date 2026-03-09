---
name: deploy-site
description: Deploy the built jlzych.com site by committing all changes in ../jlzych.github.com and pushing to GitHub. Use when the user asks to deploy, publish, or push the site live.
tools: Bash, Read
---

This skill commits all changes in the `../jlzych.github.com` output repo and pushes them to GitHub.

## Steps

1. Check the last commit message in the current source repo (`/Users/jlzych/Sites/jlzych.com`) for context on what changed.
2. Check `git status` in `../jlzych.github.com` to confirm there are changes to commit.
3. Stage all changes with `git add -A`.
4. Write a concise commit message summarizing what changed based on recent commits in the source repo.
5. Commit and push to `origin master`.

## Commit message format

- First line: short imperative summary (under 72 chars)
- Blank line
- 1-2 sentence body explaining what was done
- Blank line

## Important notes

- Always run commands with `cd ../jlzych.github.com &&` prefix since the working directory is the source repo
- If there are no changes in `../jlzych.github.com`, inform the user the site is already up to date (they may need to build first)
- Do NOT build the site as part of this skill — only commit and push what's already there
