---
title: DRY isn't the One True Principle of CSS
date: 2014-08-10 15:50 PDT
tags:
---

[Ben Frain](http://benfrain.com/) wrote a [great article](http://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/) of recommendations for writing long-living CSS that's authored by many people (e.g. CSS for a product). The whole thing is worth reading, but I especially agree with his argument against writing [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) (Don't Repeat Yourself) code at the expense of maintainability. He says:

> As a concrete example; being able to delete an entire Sass partial (say 9KB) in six months time with impunity (in that I know what will and won’t be affected by the removal) is far more valuable to me than a 1KB saving enjoyed because I re-used or extended some vague abstracted styles.

Essentially, by abstracting styles as much as possible and maximizing re-use, you're creating an invisible web of dependencies. If you ever want to change or remove styles, you will cause a ripple effect throughout your site. Tasks that should have been 30 or 60 minutes balloon into multi-hour endeavors. As Ben says, being able to delete (or modify) with impunity is far more valuable than the small savings you get by abstracting your code.

I have made this mistake many times in my career, and it took me a long time to distinguish between good and bad code reuse. The trick I use is to ask, "If I were to later change the style of this component, would I want the others that depend on it to be updated, too?" More often than not, the answer is no, and the styles should be written separately. It took some time for me to be comfortable having duplicate CSS in order to increase maintainability.

Another way of thinking about this is to figure out why two components look the same. If it's because one is a modification of a base module (e.g. a small version of a button), it's a good candidate for code reuse. If not (e.g. a tab that looks similar to a button, but behaves differently), then you're just setting yourself up for a maintainability nightmare.

As beneficial as DRY code is, it isn't the One True Principle of CSS. At best, it saves some time and bytes, but at worst, it's a hindrance to CSS maintainability.
