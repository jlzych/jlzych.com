---
title: '“Did You A/B Test It?”'
date: 2015-06-16 08:49 PDT
description: "After launching a feature, coworkers often ask me, 'Did you A/B test it?' While the question is well-meaning, A/B testing isn’t the only way, or even the best way, of making data-informed decisions in product development. In this post, I’ll explain why, and provide other ways of validating hypotheses to assure your coworkers that a feature was worth building."
tags: "A/B testing"
---

After launching a feature, coworkers often ask me, "Did you A/B test it?" While the question is well-meaning, A/B testing isn’t the only way, or even the best way, of making data-informed decisions in product development. In this post, I’ll explain why, and provide other ways of validating hypotheses to assure your coworkers that a feature was worth building.

## Implied Development Process

My coworker’s simple question implies a development process that looks like this:

1. You have an idea for a new feature
2. You build the new feature
3. You A/B test it to prove its success
4. Profit! High fives! Release party!

While this looks reasonable on the surface, it has a few flaws.

### Flaw 1: What metric are you measuring?

The A/B test in step 3 implies that you’re comparing a version of the product with the new feature to a version without the new feature. But a key part of running an A/B test is choosing a metric to call the winner, which is where things get tricky. Your instinct is probably to measure usage of the new feature. But this doesn’t work because the control lacks the feature, so it loses before the test even begins.

There are, however, higher-level metrics you care about. These could range from broad business metrics, like revenue or time in product, to more narrow metrics, like completing a specific task (such as successfully booking a place to stay in the case of AirBnB). Generally speaking, broader metrics are slower to move and influenced by more factors, so narrow metrics are better.

Even so, this type of experiment isn’t what A/B tests excels at. At its core, [A/B testing](https://www.optimizely.com/ab-testing/) is a hill climbing technique. This means it’s good at telling you if small, incremental changes are an improvement (in other words, each test is a step up a hill). Launching a feature is more like exploring a new hill. You’re giving users the ability to do something they couldn’t do before. A/B testing isn’t good at comparing hills to each other, nor will it help you find new hills.

### Flaw 2: What if the new feature loses?

Let’s say you have good metrics to measure, and enough traffic to run the test in a reasonable timeframe. But the results come back, and the unthinkable happened: your new feature lost. There’s no profit, high fives, or launch party. Now what do you do?

Because of sunk costs, your instinct is going to be to try to improve the feature until it wins. But an A/B test doesn’t tell you _why_ it lost. Maybe there was a minor usability problem, or maybe it’s fundamentally flawed. Whatever the problem may be, an A/B test won’t tell you what it is, which doesn’t help you improve it.

The worst-case scenario is that the feature doesn’t solve a real problem, in which case you should remove it. But this is an expensive option because you spent the time to design, build, and launch it _before_ learning it wasn't worth building. Ideally you’d discover this earlier.

## Revised Development Process

When our well-meaning coworker asked if we A/B tested the new feature, what they really wanted to know is if we have data to back up that it was worth building. To them, an A/B test is the only way they know how to answer that question. But as user experience professionals, we know there are plenty of methods for gathering data to guide our designs. Let’s revise our product development process from above:

1. You have an idea for a new feature.
1. You scope the problem the feature is supposed to solve by interviewing users, sending out surveys, analyzing product usage, or using other research methods.
1. You create prototypes and show them to users.
1. You refine the design based on user feedback.
1. You repeat steps 3 and 4 until you’re confident the design solves the problem you set out to solve.
1. You build the feature.
1. You do user testing to find and fix usability flaws.
1. You release the feature via a phased rollout (or a private/public/opt-in beta) and measure your key metrics to make sure they’re within normal parameters.
    - This can be run as an A/B test, but doesn’t need to be.
1. Once you’re confident the feature is working as expected, fully launch it to everyone.
1. Profit! High fives! Release party!
1. Optimize the feature by A/B testing incremental changes.

In this revised development process (commonly called [user-centered design](http://www.usability.gov/what-and-why/user-centered-design.html)), you’re gathering data every step of the way. Rather than building a feature and "validating" it at the end with an A/B test, you’re continually refining what you’re building based on user feedback. By the time you release it, you’ve iterated countless times and are confident it’s solving a real problem. And once it’s built, you can use A/B testing to do what A/B testing does best — optimization.

A longer process? Yes. A more confident, higher quality launch? Also yes.

---

Now when your coworkers ask if you A/B tested your feature, you can reply, "No, but we made data-informed decisions that told us users really want this feature. Let me show you all of our data!" By using research and A/B testing appropriately, you’ll build features that your users _and_ your bottom line will love.

#### Further Reading

If you’d like to learn how other companies incorporate A/B testing into their development process, or about user-centered design in general, these articles are great resources:

- ["Building websites with science"](https://codeascraft.com/2012/06/21/building-websites-with-science/) by Peter Seibel — A broad overview with examples of how Etsy incorporates A/B testing into the development process.
- ["Design for Continuous Experimentation: Talk and Slides"](http://mcfunley.com/design-for-continuous-experimentation) by Dan McKinley — Good and bad examples of how Etsy has experimented while building features.
- ["Experiments at Airbnb"](http://nerds.airbnb.com/experiments-at-airbnb/) by Jan Overgoor — A great overview of how AirBnB incorporates A/B testing into feature development, complete with best practices.
- ["A/B Testing, Usability Engineering, Radical Innovation: What Pays Best?"](http://www.nngroup.com/articles/ab-testing-usability-engineering/) by Jakob Nielsen — Compares A/B testing, usability testing, and radical innovation to each other, with advice for when to use each method.
- ["When to Use Which User-Experience Research Methods"](http://www.nngroup.com/articles/which-ux-research-methods/) by Christian Rohrer — A run down of all the user-experience research methods, and when to use each one.
- ["User-Centered Design Basics"](http://www.usability.gov/what-and-why/user-centered-design.html) on usability.gov — A good introduction to the user-centered design process.
- ["How Not to Run an A/B Test"](http://www.evanmiller.org/how-not-to-run-an-ab-test.html) by Evan Miller — Best practices for running an A/B test, which are especially important to get right when testing in product.

_Thanks to [Kyle Rush](http://kylerush.net/), [Olga Antonenko Young](https://twitter.com/olgavyoung), and [Silvia Amtmann](https://twitter.com/hiSilv) for providing feedback on earlier drafts of this post._
