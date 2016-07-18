---
title: Discovery Kanban at Optimizely
subtitle: How we transformed our Agile process to include research and design
date: 2016-07-17 21:47 PDT
tags: ["process", "kanban", "design"]
---

![Discovery work planning meeting](/images/2016-07-17-discovery-kanban-at-optimizely/discovery-planning.jpeg)
_Discovery work planning meeting_

Like most tech startups, Optimizely uses an Agile process to build software. Agile has been great at helping us plan what we’re building, coordinate across teams, and ship iteratively. Agile’s focus, however, is on shipping working software, which meant design and research were awkwardly shoehorned into the process.

<iframe width="700" height="393" src="https://www.youtube.com/embed/oyVksFviJVE" frameborder="0" allowfullscreen></iframe>
_Scrum, according to HBO’s Silicon Valley_

Practically speaking, this meant we got into a habit of building a feature while it was being designed. This put pressure on designers to produce mockups of a feature in order to “unblock” engineers, which didn’t give them room to understand the problem and iterate on solutions. And it rarely provided space for our researchers to gather data to understand the problem, or do usability testing.

This caused problems on the engineering side, too: since engineers were building a feature while it was being designed, the requirements were shifting as we explored solutions. This slowed down the development process since they would have questions about what to build, and features would have to be rewritten as the designs evolved. This also made it hard to estimate how long it would take to build, which led to missed deadlines, cutting corners (such as not writing unit tests and or doing formal QA), and low morale.

In short, our process didn’t have high velocity or produce high quality solutions.

To improve this situation, we split our product development process into two phases: **Discovery** and **Delivery**. In the Discovery phase, the goal is to understand and solve our customer’s problems. The output is **finished designs** that solve for all use cases. After designs are done, work moves into the Delivery phase. The goal of this phase is to ship the finished solution to customers, and uses our standard Agile process to manage and plan the work.

The key to this system is that design and research are an **explicit part of the process**, and there is acceptance criteria that must be met before engineers write any code.

![Diagram of Optimizely’s product development process](/images/2016-07-17-discovery-kanban-at-optimizely/discovery-system.jpeg)
_Diagram of Optimizely’s product development process_

To help with organizational buy-in and planning, Discovery work is tracked on a physical kanban board in our office. The board is split into two parts: **Problem Understanding (Research)**, and **Solution Exploration (Design)**. In the Problem Understanding phase we gather data to help us understand and frame the problem. Data includes both qualitative and quantitative data, such as customer interviews, surveys, support tickets, sales call feedback, product usage, and NPS feedback. That data either becomes general company knowledge, such as our user personas, or feeds directly into the Solution Exploration phase.

In Solution Exploration, designers use the data gathered during Problem Understanding to frame the problem to be solved. Designers explicitly write down what the problem is, use cases, target users, and anything that’s out of scope. After getting buy-in from the PM and team, they explore solutions by creating sketches, wireframes, and prototypes. Engineers are looped in to provide feedback on technical feasibility. Researchers do usability testing in this phase as well. Finally, the output is finished designs that are fully thought through. This means there are no open questions about what a feature does that would slow down an engineer during development.

![Optimizely’s Discovery kanban board](/images/2016-07-17-discovery-kanban-at-optimizely/board.jpeg)
_Optimizely’s Discovery kanban board_

## Is this waterfall?

This process is more structured than our previous Agile process, but not as rigid as a typical waterfall process. We don’t “throw work over the wall” to each other, stop requirements from changing, or rely on documentation to communicate across teams.

Additionally, designers still sit with scrum teams and attend standups. This keeps whole team involved throughout the entire process. Although engineers aren’t building anything during the Discovery phase, they are aware of what problem we’re solving, why we’re solving it, and proposed solutions. And designers are included in the Delivery phase to make sure the finished feature matches what they designed.

---

Since rolling out this system across our scrum teams, our design and development process has been much smoother. Researchers have a stronger voice in product development, designers have space to iterate, and engineers are shipping faster. By giving designers and researchers an explicit place in our product development process, we’ve improved our planning, increased coordination and alignment across teams, and upped our velocity and quality.

## Further Reading

These posts all informed my thinking for why I implemented Discovery Kanban at Optimizely:

- [Dual Track Agile: Better Products, Faster](http://johnpeltier.com/blog/2015/07/12/dual-track-agile-better-products-faster/) by John Peltier
- [Dual Track Scrum](http://svpg.com/dual-track-scrum/) by Marty Cagan
- [Common Agile Practice isn’t for Startups](http://jpattonassociates.com/common-agile-isnt-for-startups/) by Jeff Patton

---

_This article originally appeared on [Medium](https://medium.com/design-optimizely/discovery-kanban-at-optimizely-7b3025066d54#.3iadc9q4l)_
