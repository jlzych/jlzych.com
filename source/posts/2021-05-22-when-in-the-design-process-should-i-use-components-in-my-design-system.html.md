---
title: When in the design process should I use components in my design system?
date: 2021-05-22 15:51 PDT
tags: ["product design", "design systems", "design process"]
description: 'A common mistake I see product designers make is that they start the solution exploration phase by cobbling together UIs out of the components and patterns in their design system (often skipping lo-fi, broad explorations).'
---

A common mistake I see product designers make is that they start the solution exploration phase by cobbling together UIs out of the components and patterns in their design system (often skipping [lo-fi, broad explorations](/2020/04/07/the-power-of-low-fidelity/), which is a separate rant [and one that Figma makes far too tempting with its shared libraries `#endrant`]).

"But I want to be consistent with the rest of our product! Shouldn't I be using existing components and patterns? Why is that bad?" I hear you protesting.

I applaud your instinct 👏 It's coming from a good place. But don't do it. You're artificially constraining the solution space before you've found the best design for the specific problem you're trying to solve. You're potentially overlooking better options by only using what currently exists.

"So what do I do? Ignore the design system altogether?"

No, that would make the design system pointless, wouldn't it? But actually, yes — kind of. The proper time to reach for the components in your design system at the *end* of solution exploration, when you've nailed down the interactions and flows, have validated it with customers, and your team is ready for you to create the final hi-fi designs for engineers to build.

At that point you can take what you have (which should be mid-fi at most), and seek out the components that most closely match what's in your designs. A mature, robust design system should have components for the majority of the UIs you create. There may be some things that you did slightly differently than the standard component, and you can adjust your design to fit what exists with little to no impact to the usability of your feature.

"But what if there is no component that meets my need?" Now this is where things get interesting. In this case, you should go to your design systems team to get their input on your designs.

First, confirm that you didn't overlook or misunderstand anything in the system. It's possible there's a component you should use, which the team can educate you on.

Assuming there is no component you can use, you can now work with the team to determine next steps. There are 2 options here: either your thing is a snowflake (i.e. it isn't a generalizable component that can be used elsewhere), in which case your team can build it as part of the feature; or, the design system needs to be extended.

If it's the latter, congratulations! You have a contribution to the design system. You have a specific use case for a component or pattern for a feature that's been validated with real users, and no known equivalent in the existing system. You can work with the design systems team to flesh it out into a generalized pattern.

Design systems are meant to be living systems that grow and change as products grow and change (in my opinion. Some people may think they're a tightly controlled system that everyone should conform to, but those people are wrong). The best way for them to grow is *organically* — meaning through contributions from specific features that identify gaps in the current system. Not from hypothetical, "I saw this pattern in Material Design and thought it would be cool to add to our system..."

So there you have it! Next time you're entering the solution exploration phase and you feel the instinct to reach for your Figma component library, STOP! 🛑 ✋ 🙅. Do not pass go. Do not collect $200. Start with as few constraints as possible and explore broadly before honing in on the best solution. Only then should you translate what you have into the design language provided by your design system.
