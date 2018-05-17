---
title: When Do You Do User Testing?
date: 2014-03-02 15:37 PST
description: "In response to my preview redesign post, my uncle asked, 'When does the designer go with their own analysis of a design and when do they do a usability test?' I've been asked this question a lot, and we often discuss it in product development meetings."
tags: ["Optimizely"]
---

In response to my [preview redesign post](/2014/02/11/re-designing-optimizely-s-preview-tool/), my uncle asked, "When does the designer go with their own analysis of a design and when do they do a usability test?" I've been asked this question a lot, and we often discuss it in product development meetings. It's also something I wanted to elaborate on more in the post, but it didn't fit. So I will take this opportunity to roughly outline when we do user testing and why.

## The Ideal

In an ideal world, we would be testing all the time. Having a tight feedback loop is invaluable. By which I mean, being able to design a solution to a problem and validating that it solves said problem immediately would be amazing. And in product design, the best validation is almost always user testing.

## The Reality

In reality, there's no such thing as instant feedback. You can't design something and receive immediate feedback. There's no automated process that tells you if a UI is good or not. You have to talk to actual humans, which takes time and effort.

This means there's a trade-off between getting as much feedback as possible, and actually releasing something. The more user testing you do, the longer it will take to release.

### What we do at Optimizely

At [Optimizely](https://www.optimizely.com), we weigh the decision to do user testing against deadlines, how important the questions are (e.g. are they core to the experience, or an edge case), how likely we are to get actionable insights (e.g. testing colors will usually give you a bunch of conflicting opinions), and what other research we could be doing instead (i.e. opportunity cost).

With the preview redesign, we started with exploratory research to get us on the right track, but didn't do much testing beyond that. This was mainly because we didn't make time for it. It was clear from our generative research that adding impersonation to the preview tool would be a step in the right direction. But it's only one part of a larger solution, and won't be used by everyone. We didn't want to slow down our overall progress by spending too much time trying to perfect one piece of a much larger puzzle.

So with the preview tool, I had to rely on my instincts and feedback from other designers, engineers, and product managers to make decisions. One such example is when I decided to hide the impersonation feature by default, and it would slide out when an icon is clicked. Of this solution I said:

> But it worked _too_ well [at solving the problem of the impersonation UI being distracting]. The icon was too cryptic, and overall the impersonate functionality was too hidden for anyone to find.

As my uncle pointed out, I didn't do any user testing to make this call. I looked at what I had created, and could tell it wasn't a great solution (which was also confirmed by my teammates). I was confident the decision to keep iterating was right based on established [usability heuristics](http://www.nngroup.com/articles/ten-usability-heuristics/) and my own experience.

However, not all design decisions can be guided by general usability guidelines. One such example is when I went in circles designing how a person sets impersonation values. I tried using established best practices and talking to other designers, but neither method led me to an answer. At this point, user testing was my only out.

In this case, we opted for [guerrilla usability testing](http://www.nngroup.com/articles/guerrilla-hci/). Recruiting actual users would have required more time and resources than we wanted to spend. So I called in two of our sales guys, who made for good proxies of semi-experienced users that are technically middle-of-the-road (i.e. they have some basic code knowledge, but aren't developers), which covers the majority of our users. Their feedback made the decision easy, and successfully got me out of this jam.

## In Summary

In a perfect world we would be testing all the time, but in reality that just isn't feasible. So we do our best to balance the time and resources required to test a UI against the overall importance of that feature. But usability testing won't find every flaw. Eventually you have to ship — you can't refine forever, and no design is perfect.
