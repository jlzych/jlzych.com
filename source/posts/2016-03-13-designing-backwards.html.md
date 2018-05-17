---
title: Designing Backwards
date: 2016-03-13 19:19 PDT
description: "Action is the bedrock of drama. Action drives the play forward and makes for a compelling story that propels the audience to the end. And an engaging play is just a series of connected actions, according to David Ball in 'Backwards & Forwards.'"
tags:
---

Action is the bedrock of drama. Action drives the play forward and makes for a compelling story that propels the audience to the end. And an engaging play is just a series of connected actions, according to David Ball in _[Backwards & Forwards](http://www.amazon.com/Backwards-Forwards-Technical-Manual-Reading/dp/0809311100)_.

Like a play, the user’s journey through your product is also a series of connected actions. Every click, tap, and swipe is an action users take. But unlike the audience of a play, which is just along for the ride, your users are in the driver’s seat trying to reach a specific goal. If you, as the designer, don’t make the series of actions to reach that goal clear, your users will get lost and your product will fail.

To help authors write engaging plays, David Ball recommends starting at the end of the play and identifying each preceding action, all the way back to the beginning. By looking backwards, you can see the specific steps that led to a particular outcome. “The present demands and reveals a specific past. One particular, identifiable event lies immediately before any other,” he says.

Looking forward, on the other hand, presents unlimited possibilities. The outcome of an action can trigger any number of other actions. You can only know which specific action comes next by looking backwards from the end.

This technique applies just as well to designing user experiences as it does to writing plays. Start by **identifying the user's goal**, then **walk backwards through each action** they must take to get there.

An example makes this clearer. Before we launched [native mobile A/B testing at Optimizely](https://www.optimizely.com/mobile), my colleague Silvia and I re-designed the onboarding flow using this technique. _([Silvia wrote about the onboarding flow on Medium.](https://medium.com/design-optimizely/behind-the-design-of-optimizely-s-mobile-onboarding-c47ad1d2748e#.6ipk86q2y))_

We identified the user’s goal as **creating their first A/B test**. We arrived there by understanding the problem that A/B testing solves for our customers, which is to improve their app and ultimately make their business more successful.

If we had started at the beginning and worked our way forward, it would have been easy to stop once they installed our mobile SDK. But installing an SDK isn’t the customer’s goal. There’s no inherit value in that – it's just a stepping stone to getting value out of our product.

Then we walked backwards through each step a user must take to reach that goal:

- Goal: create your first A/B test.
- To create an A/B test, you must install the SDK.
- To install the SDK, you need to download it and add an account-specific identifier to your app.
- To download and set up the SDK, you need an account and a project ID.
- To create an account and a project, you must sign up by entering your info (name, email, billing info, etc.) in a form on our website.

Just by writing out each step like this, we eliminated excess steps and didn’t get distracted by edge cases or side flows. We had a focused list of tasks to design for. And at the conclusion of each task, we knew the next task to lead the user to.

Using this series of steps as a skeleton, we were able to design an onboarding flow that seamlessly led users to their goal. The experience has been praised by customers, and none of them have needed any help from our support team to create their first test.

So next time you’re designing a complex flow, start with the user’s goal and work your way backwards through each action they must take to get there. This technique will put you in an empathetic mindset that will result in user experiences that are clear and focused.

“Of such adjacent links is life — and drama — made up,” says David Ball. And so is product design.
