---
title: Why we built the Optimizely Styleguide
date: 2013-11-11 12:16 PST
description: "A few months ago, myself and the design team created the Optimizely Stylguide. It's a living document of our brand standards and the visual style of our site. Designing, building, and writing the content for it took a significant amount of time, but it was worth the effort. In this post I'm going to explain why we did it."
tags: [styleguide, Optimizely]
---

A few months ago, myself and the design team created the Optimizely Stylguide _(note: the styleguide has been deprecated)_. It's a living document of our brand standards and the visual style of our site. Designing, building, and writing the content for it took a significant amount of time, but it was worth the effort. In this post I'm going to explain why we did it.

## Why build a styleguide?

### A branding one-stop-shop

The original reason we wanted to build a styleguide was because we often get requests from people around the company for our logo. They also like to ask us which blue is our official blue. (It's `#1964af`). Providing one place for everyone to access this information, and explaining when and how to use our logos, saves both parties time.

To achieve this goal, we put the full Optimizely logo, the Optimizely O, and our official brand colors on the styleguide's home page. We provided the logos in png, psd, svg, and eps formats in black, white, and Optimizely blue, which covers the widest use cases. Since this is the primary information that most people are looking for, it makes sense to have it be the most immediately available.

### Document our visual style

The second biggest driving force was to provide developers (including myself) documentation of the modules, classes, and mixins that exist in the codebase. It's important that we maintain a consistent visual style, and re-using classes and mixins helps ensure we're consistent. It also speeds up development. There have been a lot of times that I've written a mixin or class that someone didn't know about, and they re-implemented it in a different area of our code. Documenting these styles helps prevent this.

Furthermore, complex widgets that require a combination of HTML, CSS, and JS to function properly (such as popovers and dialog boxes) are hard to figure out just from reading source code. Explaining how to add these modules to a page, and all of their styling and JS options, is invaluable.

In addition to just explaining how something works, we also wanted to document when it's appropriate to use these various modules. You also can't get this from reading code alone. This helps both engineers and designers understand when to use a popover instead of a tooltip, for example.

This content is the meat of the site, and the parts that change most frequently (in fact, many still need to be written). We decided the most effective way to document these elements was to create real, working examples with HTML, CSS, and JS, rather than just provide static screenshots. This allows developers to interact with the widgets, see how they behave, and inspect the code. It also makes it easier to communicate complex modules, such as popovers and dialog boxes. We took a lot of inspiration from [Twitter's Bootstrap](http://getbootstrap.com/) and [Zurb's Foundation](http://foundation.zurb.com/), which are both fantastic examples of using working code as documentation.

### Code conventions

Along with documenting the various modules and classes we have available, we also wanted a place to explain our frontend code conventions (e.g. how to name classes, how files are organized, etc.). This is especially useful for new developers who are getting up to speed, but is also beneficial as a reference for all developers.

### Shake out inconsistencies

Finally, a secondary goal and benefit of documenting our styles is that it brings us face to face with inconsistencies that need to be ironed out. There have been numerous times that writing down how something works made these inconsistencies obvious. This acts as a great forcing function to get us to have consistent styles (although we haven't had time to fix all of them).

## Conclusion

In the months since the guide was released, it has been successful at achieving each of these goals. Various people around the company consult it regularly for our logos and colors; developers refer to it when implementing common modules; new developers have learned our coding conventions on their own; and we've found many ways to improve our visual style and code. Taking the time to build and document our brand guidelines and frontend code was well worth the effort, and I recommend anyone else who works on a moderately complex site build their own styleguide.
