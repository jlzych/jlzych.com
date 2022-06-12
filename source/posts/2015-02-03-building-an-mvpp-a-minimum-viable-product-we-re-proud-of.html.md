---
title: Building an MVPP - A Minimum Viable Product we're Proud of
date: 2015-02-03 20:20 PST
description: On November 18th, 2014, we publicly released Optimizely's iOS editor. This was a big release for us because it marked the end of a months-long public beta in which we received a ton of customer feedback and built a lot of missing features.
relative_image_url: /images/2015-02-03-building-an-mvpp-a-minimum-viable-product-we-re-proud-of/1-finished-editor.png
tags: "design process"
popular_post: true
---

On November 18th, 2014, we publicly released [Optimizely's iOS editor](https://www.optimizely.com/mobile). This was a big release for us because it marked the end of a months-long public beta in which we received a ton of customer feedback and built a lot of missing features. But before we launched, there was one problem the whole team rallied behind to fix: we weren’t *proud* of the product. To fix this issue, we went beyond a Minimum Viable Product (MVP) to an MVPP — the Minimum Viable Product we're Proud of.

What follows is the story of how we pulled this off, what we learned along the way, and product development tips to help you ship great products, from the perspective of someone who just did it.

![Finished iOS editor](http://jlzych.com/images/2015-02-03-building-an-mvpp-a-minimum-viable-product-we-re-proud-of/1-finished-editor.png)

*The finished iOS editor.*

## Genesis of the MVPP

We released a [public beta](http://blog.optimizely.com/2014/06/16/optimizely-for-ios-now-available-in-public-beta/) of Optimizely's iOS editor in June 2014. At that time, the product wasn't complete yet, but it was important for us to get real customer feedback to inform its growth and find bugs. So after months of incorporating user feedback, the beta product felt complete enough to publicly launch. There was just one problem: **the entire team wasn't proud of the product**. It didn't meet our quality bar; it felt like a bunch of features bolted together without a holistic vision. To fix this, we decided to overhaul the user experience, an ambiguous goal that could easily go on forever, never reaching a clear “done” state.

We did two things to be more directed in the overhaul. First, we committed to a deadline to prevent us from endlessly polishing the UI. Second, we took inspiration from the Lean Startup methodology and chose a set of features that made up a [Minimum Viable Product](http://theleanstartup.com/principles) (MVP). An MVP makes it clear that we'll cut scope to make the deadline, but nothing about quality. So to make it explicit that we were focusing on quality and wanted the whole team to be proud of the final product, we added an extra "P" to MVP. And thus, the **Minimum Viable Product we're Proud of — our MVPP** — was born.

## Create the vision

Once we had agreed on a feature set for the MVPP, a fellow Product Designer and I locked ourselves in a [war room](http://www.fastcodesign.com/3028471/google-ventures-your-design-team-needs-a-war-room-heres-how-to-set-one-up) for the better part of a week to flesh out the user experience. We mapped out user flows and created rough mock ups that we could use to communicate our vision to the larger development team. Fortunately, we had some pre-existing usability test findings to inform our design decisions.

![Picture of our war room in action](http://jlzych.com/images/2015-02-03-building-an-mvpp-a-minimum-viable-product-we-re-proud-of/2-war-room.jpg)

*Sketches, mockups, and user flows from our war room.*

These mockups were immensely helpful in planning the engineering and design work ahead. Instead of talking about ideas in the abstract, we had concrete features and visuals to point to. For example, everyone knew what we meant when we said "Improved Onboarding Flow." With mockups in hand, communication between team members became much more concrete and people felt inspired to work hard to achieve our vision.

## Put 6 weeks on the clock… and go!

We had 3 sprints (6 weeks) to complete the MVPP (most teams at Optimizely work in 2 week cycles called “sprints”). It was an aggressive timeline, but it felt achievable — exactly where a good deadline should be.

In the first sprint, the team made amazing progress. All the major pieces had been built, without any major re-scoping or redesigns. There were still bugs to fix, polish to apply, and edge cases to consider, but the big pieces core to our vision were in place.

That momentum carried over into the second sprint, which we spent fixing the biggest bugs, filling functional holes, and polishing the UI.

For the third and final sprint, we gave ourselves a new goal: ship a week early. We were already focused on launching the MVPP, but at this point we became laser focused. During daily standups, we looked at our JIRA board and asked, “If we were launching tomorrow, what would we work on today?”

We were ruthless about prioritizing tasks and moved a lot of items that were important, but not launch-critical, to the backlog.

During the first week of sprint 3, we also did end-to-end product walkthroughs after every standup to ensure the team was proud of the new iOS editor. We all got to experience the product from the customer's perspective, and caught user experience bugs that were degrading the quality of our work. We also found and fixed a lot of functional bugs during this time. By the end of the week, everyone was proud of the final product and felt confident launching.

## The adrenaline rush & benefit of an early release

On 11/10, we quietly released our MVPP to the world — a full week early! Not only did shipping early feel great, it also gave us breathing room to further polish the design, fix bugs, and give the rest of the company time to organize all the components to launch the MVPP.

Product teams don’t launch products alone; it takes full collaboration between marketing, sales, and success to create materials to promote it, sell it, and enable our customers to use it. By the time the public announcement on 11/18 rolled around, the whole company was extremely proud of the final result.

## Lessons learned

While writing this post and reflecting on the project as a whole, a number of techniques became clear to me that can help any team ensure a high quality, on-time launch:

- **Add a “P” to “MVP” to make quality a launch requirement:** Referring to the project as the “Minimum Viable Product we’re Proud of” made sure everyone on the team approached the product with quality in mind. Every project has trade-offs between the ship date, quality, and scope. It’s very hard to do all three. Realistically, you can do two. By calling our project an MVPP, we were explicit that quality would not be sacrificed.
- **Set a deadline:** Having a deadline focused everyone’s efforts, preventing designers from endlessly polishing interfaces and developers spinning their wheels imagining every possible edge case. Make it aggressive, yet realistic, to instill a sense of urgency in the team.
- **Focus on the smallest set of features that provide the largest customer impact:** We were explicit about what features needed to be redesigned, and just as importantly, which were off limits. This prevented scope-creep, and increased the team’s focus.
- **Make mockups before starting development:** This is well-known in the industry, but it’s worth repeating. Creating tangible user flows and mockups ahead of time keeps planning discussions on track, removes ambiguity, and quickly explains the product vision. It also inspires the team by rallying them to achieve a concrete goal.
- **Do daily product walkthroughs:** Our product walkthroughs had two key benefits. First, numerous design and code bugs were discovered and fixed. And second, they ensured we lived up to the extra “P” in “MVPP.” Everyone had a place to verbally agree that they were proud of the final product and confident launching. Although these walkthroughs made our standups ~30 minutes longer, it was worth the cost.
- **Ask: “If we were shipping tomorrow, what would you work on today?”:** When the launch date is approaching, asking this question separates the critical, pre-launch tasks from the post-launch tasks.

## Lather, Rinse, and Repeat

By going beyond an MVP to a Minimum Viable Product we’re Proud of, we guaranteed that quality was the requirement for launching. And by using a deadline, we stayed focused only on the tasks that were absolutely critical to shipping. With a well-scoped vision, mockups, and a date not too far in the future, you too can rally teams to create product experiences they’re proud of. And then do it again.
