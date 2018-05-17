---
title: Response to CSS Regions Considered Harmful
date: 2014-02-09 12:49 PST
description: "Håkon Wium Lie, the father of CSS, wrote a great critique of the CSS Regions spec. His article pointed out many of the same flaws that I've noticed."
relative_image_url: /images/2014-02-09-response-to-css-regions-considered-harmful/regions-demo.png
tags: css
---

[Håkon Wium Lie](http://people.opera.com/howcome/), the father of CSS, wrote a [great critique](http://alistapart.com/blog/post/css-regions-considered-harmful) of the [CSS Regions spec](http://www.w3.org/TR/2013/WD-css3-regions-20130528/). His article pointed out many of the same flaws that I've noticed.

My biggest complaint is it requires empty, dummy HTML elements to flow content into. I can think of nothing more un-semantic than having to place empty elements in your document purely for presentational purposes. As Håkon says, "it’s not regions per se that are harmful to web semantics, it’s the fact that they are encoded as presentational HTML elements." Exactly. HTML is supposed to provide a meaningful, semantic structure to the content. Empty elements provide no meaning or structure whatsoever.

Håkon goes on to say, "If we want regions on the web, we should find a way to write them in CSS and not in HTML." Ideally, the spec would allow us to break text up into multiple regions through CSS alone. The spec, as it's written today, breaks HTML and CSS's [separation of presentation and content](http://en.wikipedia.org/wiki/Separation_of_presentation_and_content).

A few people have [proposed using pseudo elements](http://flippinawesome.org/2014/01/27/css-regions-matter/) to overcome the empty element issue. While this is a good idea, it only covers a limited number of use cases. Complex layouts, like [the sample](http://www.w3.org/TR/2013/WD-css3-regions-20130528/#named-flows-and-regions) provided in the spec, are not possible with pseudo-elements alone.

Empty HTML elements are the result of another issue I have with the spec: it's applying a desktop publishing solution to the problem of creating rich magazine layouts on the web. The spec is analogous to laying out a page in InDesign by creating text boxes and flowing content from one box to the next. This works great when you control the page size and typography, and can add and resize text boxes as necessary. Unfortunately, the web is more dynamic than this. There's no given page size, and browsers render pages differently depending on a person's type preferences and device. Many of the demos I've seen, such as [this example](http://sarasoueidan.com/blog/css-regions-with-shapes-for-readability/) from [Sara Soueidan](http://sarasoueidan.com/) (pictured below), have a design that is tightly coupled to the amount of text, the typeface, and the font size. If the reader set their type size to large, or the fall back font is loaded, this layout will not render as designed.

![Complex CSS Regions example](/images/2014-02-09-response-to-css-regions-considered-harmful/regions-demo.png)

_This regions example presents a design that is tightly coupled to the typeface and font size._

Of course, as web developers part of our job is to find solutions to these problems. But I used this example to illustrate my larger point, which is **the spec awkwardly applies a desktop publishing solution to the web, the result of which is unsemantic HTML**.

The web would benefit from more complex layouts, and I commend the goal of the proposal. Unfortunately, it encourages unsemantic markup, and tries to use a solution from the static desktop publishing world to the dynamic web. We need a solution designed for the fluid nature of the web that maintains HTML and CSS's separation of concerns.
