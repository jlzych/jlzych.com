---
title: Did you A/B test the redesigned preview tool?
date: 2014-03-11 09:50 PDT
tags: ["a/b testing", "Optimizely"]
---

A lot of people have asked me if we [A/B tested](https://www.optimizely.com/ab-testing) the [redesigned preview tool](/2014/02/11/re-designing-optimizely-s-preview-tool/). The question comes in two flavors: did we use A/B testing to validate impersonation was worth building (a.k.a. fake door testing); and, did we A/B test the redesigned UI against the old UI? Both are good questions, but the short answer is no. In this post I'm going to dig into both and explain why.

## Fake Door Testing

[Fake door testing](http://www.slideshare.net/JessLee4/fake-doors-how-to-test-product-ideas-quickly-hustlecon-2013) ([video](http://vimeo.com/24744647)) is a technique to measure interest in a new feature by building a "fake door" version of it that looks like the final version (but doesn't actually work) and measuring how many people engage with it. Trying to use the feature gives users an explanation of what it is, that it's "Coming soon", and usually the ability to "vote" on it or send feedback (the specifics vary depending on the context). This doesn't need to be run as an A/B test, but setting it up as one lets you compare user behavior.

We could have added an "Impersonate" tab to the old UI, measured how many people tried to use it, and gathered feedback. This would have been cheap and easy. But we didn't do this because the feature was inspired by our broader research around personalization. Our data pointed us towards this feature, so we were confident it would be worthwhile.

But more than that, measuring clicks and votes doesn't tell you much. People can click out of curiosity, which doesn't tell you if they'd actually use the feature or if it solves a real problem. Even if people send feedback saying they'd love it, [what users say and what they do is different](http://www.nngroup.com/articles/first-rule-of-usability-dont-listen-to-users/). Actually talking to users to find pain points yields robust data that leads to richer solutions. The new impersonate functionality is one such example — no one had thought of it before, and it wasn't on our feature request list or product roadmap.

However, not everyone has the resources to conduct user research. In that situation, fake door testing is a good way of cheaply getting feedback on a specific idea. After all, some data is better than no data.

## A/B Testing the Redesigned UI

The second question is, "Did you A/B test the redesigned preview against the previous one?" We didn't, primarily because there's no good metric to use as a conversion goal. We added completely new functionality to the preview tool, so most metrics are the equivalent of comparing apples to oranges. For example, measuring how many people impersonate a visitor is meaningless because the old UI doesn't even have that feature.

So at an interface level, there isn't a good measurement. But what about at the product level? We could measure larger metrics, such as the number of targeted experiments being created, to see if the new UI has an effect. There are two problems with this. First, it will take a long time (many months) to reach a statistically significant difference because the conversion rate on most product metrics are low. Second, if we eventually measured a difference, there's no guarantee it was caused by adding impersonation. The broader the metric, the more factors that influence it (such as other product updates). To overcome this you could freeze people in the "A" and "B" versions of the product, but given how long it takes to reach significance, this isn't a good idea.

Companies like Facebook and Google have enough traffic that they actually are able to roll out new features to a small percentage of users (say, 5%), and measure the impact on their core metrics. If any take a plunge, they revert users to the previous UI and keep iterating. When you have the scale of Facebook and Google, you can get significant data in a day. Unfortunately, like most companies, we don't have this scale, so it isn't an option.

## So How Do You Know The Redesign Was Worth It?

What people are really asking is how do we know the redesign was worth the effort? Being at an A/B testing company, everyone wants to A/B test everything. But in this case, there wasn't a place for it. Like any method, [split testing has its strengths and weaknesses](http://www.nngroup.com/articles/ab-testing-usability-engineering/).

## No, Really — How _Do_ You Know The Redesign Was Worth It?

Primarily via qualitative feedback (i.e. talking to users), which at a high level has been positive (but there are some improvements we can make). We're also measuring people's activities in the preview tool (e.g. changing tabs, impersonating visitors, etc.). So far, those are healthy. Finally, we're keeping an eye on some product-level metrics, like the number of targeted experiments created. These metrics are part of our long-term personalization efforts, and we hope in the long run to see them go up. But the preview tool is just one piece of that puzzle, so we don't expect anything noticeable from that alone.

The important theme here is that gathering data is important to ensure you're making the best use of limited resources (time, people, etc.). But there's a whole world of data beyond A/B testing, such as user research, surveys, product analytics, and so on. It's important to keep in mind the advantages and disadvantages of each, and use the most appropriate ones at your disposal.
