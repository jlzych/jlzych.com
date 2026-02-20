---
title: Claude Code is Re-shaping My Design Process
date: 2026-02-20 10:14 PST
tags: ["product design", "design process", "ai"]
relative_image_url: /images/2026-cc-process/git-commits.png
description: Claude Code has fundamentally changed how I design. I'm skipping mid-fi mockups entirely, going straight to working code, and shipping more than ever. Here's how my process has evolved — and what hasn't changed.
---

![Git commits graph showing increased activity](/images/2026-cc-process/git-commits.png)

This image tells the story: the uptick in commits is me designing and shipping with Claude Code. I'm using it daily. Likewise, my usage of Figma has fallen significantly.

Claude Code lets me describe the intended user experience — the use cases, expected behavior, how a feature might evolve — and it figures out how to build it. This is basically how I've always worked with engineers. Only I’m in control of the engineer and they’ll do whatever I say 😄

Now I skip mid-fi mockups completely and go straight to CC and with some good prompting (which comes easily from spending a career describing intent and giving context). I can get a pretty good version working in a matter of minutes. Then keep shaping it with CC to finalize the functionality and interactions and UI.

Directly editing a working version of a feature with real data is great because little things that improve the overall UX jump out much more quickly compared to static mockups, or even clickthrough prototypes. Like sorting, or filtering, or when data is too long or too short, and so on.

## My new (and still evolving) process

My process has changed significantly over the past few months.

For minor features — like quality of life improvements, adding a search field to a list, anything using well-worn patterns and existing components — I skip Figma entirely and go straight to Claude Code. No wireframes, no handoff. And Claude does great at using the right components and patterns, especially with the right prompting. (And even sometimes without good prompting; Opus 4.6 is crazy good at understanding the codebase and doing the right thing even when you aren’t explicit about it).

For bigger features with large solution spaces, I still do upfront discovery work and solution exploration. But even that looks different now. I write out the problem, use cases, the "shape" of a good solution (for example, “feels fast and frictionless”, “doesn't make the user do extra work”, etc.), and potential approaches. Then I take this to Claude (just regular Claude chat, not CC) and ask for more ideas. It usually has a couple interesting ones I hadn't considered, plus some clunkers that don't fit the context.

From there I'll have Claude generate interactive artifacts of my favorite directions — these are great for getting a feel for the solution myself, and for sharing the good ones with teammates and getting their input. I'll also do quick lo-fi wireframes in Figma to try out layouts or simple ideas for cases when that’s easier than writing a prompt, waiting for Claude to do its thing, tweak and iterate via more prompting. (Sometimes it’s just faster to move some boxes around yourself).

After iteration and team discussion and getting user feedback to finalize the approach, I go to Claude Code with a few mockups to build and polish it directly in code — getting all the states just right, tuning the interactions, etc.

No handoffs. No wasteful artifacts. Just working in the final medium and firing off a PR.

Figma still wins for visual exploration. Trying color combos, typography options, new components — it's much easier to compare those side by side, zoom in and out, move things around. That kind of exploration in code is painful. But most of my work is in existing products with existing design systems, so that's a smaller slice of the process now.

What hasn't changed is focusing on users, their needs, understanding the problem, exploring lots of options, iterating, testing, and polishing. But that middle section is primarily in Claude Code now. And I can see that through to actually getting the code in users hands.

Where will we be in a year? It's impossible to predict. But I'm excited to keep trying new tools and ways of working and evolving my process. There's never been a more exciting time to be a designer.
