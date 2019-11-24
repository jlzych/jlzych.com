---
title: A story about the importance of designing every screen
date: 2019-11-23 16:27 PST
tags: "product design"
description: "\"What does the 'Archived' tab look like?\" I was walking the engineers through the final designs of some admin screens when they asked me this. The page is just a table of objects, with a tab showing the active ones, and another tab showing archived ones."
---

"What does the 'Archived' tab look like?"

I was walking the engineers through the final designs of some admin screens when they asked me this. The page is just a table of objects, with a tab showing the active ones, and another tab showing archived ones.

I hadn't explicitly designed the "Archived" tab since it was the same basic design as the accompanying active tab – a table. But I told the engineers I would mock it up.

I expected mocking it up to take a few minutes. Boy was I naive! As I mocked it up I discovered a bunch of complexity that I hadn’t anticipated (and the engineers hadn’t anticipated either). What’s the un-archive flow? These objects can be nested inside of each other (like folders), so does un-archiving a parent un-archive all of its descendants? If a child is nested, but the parent is active, how do we display that in the table (on the active tab, children are visually shown underneath and indented from parents, but if the parent isn’t archived the child will be "orphaned" on the archived tab)? If a parent and its children are archived, can you un-archive just a child? If so, where does it appear in the active hierarchy (it will once again be "orphaned")?

I mocked up these flows and made some product and design decisions to address the above complexity based on what the user would expect in these situations, and what I believe is technically possible based on my understanding of how the feature is being built. I shared it with the engineers and luckily they agreed with my decisions, so we had a happy ending (for now, at least — more unforeseen complexity may pop up while they code it).

The lesson here is that you should always **design every screen**, even if you assume it will look the same as another similar screen. Engineers appreciate you being explicit, and in the worst case (or best case, depending on your perspective), you’ll discover open questions that need to be addressed.
