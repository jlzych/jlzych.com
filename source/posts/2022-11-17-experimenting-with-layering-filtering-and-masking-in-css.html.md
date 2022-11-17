---
title: Experimenting with layering, filtering, and masking in CSS
date: 2022-11-17 10:53 PST
description: "I’ve recently been doing some experiments with layering, filtering, and masking in CSS. The language has come a long way in the past few years, with properties like `filter`, `mask-image`, `mix-blend-mode`, additional gradient types like `radial-gradient`, and more, opening the door for Photoshop-like effects that weren’t possible before."
relative_image_url: '/images/2022-css-layering/preview.png'
tags: ["frontend dev", "visual design"]
---

I’ve recently been doing some experiments with layering, filtering, and masking in CSS. The language has come a long way in the past few years, with properties like `filter`, `mask-image`, `mix-blend-mode`, additional gradient types like `radial-gradient`, and more, opening the door for Photoshop-like effects that weren’t possible before.

I did these in CSS, as opposed to Figma or Photoshop (where they are usually trivial), partly to see if I could, and partly because CSS provides a lot of advantages over graphics programs: they can scale and be responsive to browser/device sizes, dark and light modes can be controlled via CSS variables (which I didn’t do but it’s possible), they can respond to mouse movement (which I also didn’t experiment with but it’s possible), and they can have scroll effects like perspective scrolling (which I did experiment with).

I followed some tutorials and tweets (which I’ll link to), and pushed some of those in new directions.

## Adding noise via SVG filters

I was inspired by [this Tweet](https://twitter.com/FonsMans/status/1569708218351247366?s=20&t=K2ImmxsO7p0NhVwAUwXEdg) by [Fons Mans](https://twitter.com/FonsMans), where he suggests adding noise to gradients to give them an extra level of polish and pop. This got me wondering how I could do this on the web, and I remembered seeing a tutorial on CSS-Tricks ages ago about how to add noise to backgrounds programmatically via SVG filters. Actually it turned out it was two articles: [Grainy gradients](https://css-tricks.com/grainy-gradients/) by [@jimmmy](https://twitter.com/jimmmy), and [Creating patterns with SVG filters](https://css-tricks.com/creating-patterns-with-svg-filters/) by [@finnhvman](https://twitter.com/finnhvman).

I decided to add some noise to a couple of gradients on [my site](http://jlzych.com)
 — the background of the main layout, and the header of the [writing page](http://jlzych.com/writing). It’s subtle, but interesting.

![Before and after images of my site's background gradient](images/2022-css-layering/bg-gradient-before-after.png)

![Before and after images of my writing page's header gradient](/images/2022-css-layering/writing-before-after.png)

It was a fun project to figure out how to do it in code. The tl;dr is I generated a noise filter with SVG, and applied it to an `:after` element and set `mix-blend-mode` to `overlay`.

### Blobby background gradients with noise

Fons’ tweet also shows how to layer, blur, and blend elements together to make interesting background gradients in Figma, which I also did in CSS:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="gOzoymY" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/gOzoymY">
Background gradient blobs with noise</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I also created these stage lights in CSS from a picture I saw in the NY Times:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="dyemxrQ" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/dyemxrQ">
Stage lights</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

One last one inspired by the design on one of my wife’s purses:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="NWzPyJE" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/NWzPyJE">
Blobby gradient background</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Halftone patterns

I saw this cool tutorial on creating [halftone patterns in CSS](https://css-irl.info/css-halftone-patterns/) alone, so I followed that tutorial first to create this:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="zYaONyJ" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/zYaONyJ">
CSS Halftone pattern</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Then I extended that idea to do scan lines:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="vYrBpEO" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/vYrBpEO">
CSS Scan Lines pattern</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Then I extended _that_ idea to do circles radiating out of Frank Zappa’s eye (which was inspired by a photo in the record _Absolutely Free_:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="JjZjGNq" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/JjZjGNq">
Radiating circles overlay</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

![Zoomed in picture of radial gradient on Zappa's eye in Absolutely Free](images/2022-css-layering/Zappa-eye-zoom-in.jpg)

All of those inspired me to do a motion blur type pattern by blurring SVG noise in one direction, and layering that on top of some stripes. It didn’t quite come out how I had envisioned (I wanted to get it to look more like putting some paint on a canvas and scraping it down), but it’s kinda cool in its own way:

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="qBKBJej" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/qBKBJej">
Motion blur experiment</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Trippy pop art

All of those led me to create some trippy pop art that uses layering and blending to get different colors, and perspective for different scroll speeds so each layer moves across each other at different rates. Scroll within each of these Codepen embeds to see what I mean.

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="mdKJdJX" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/mdKJdJX">
Trippy pop art stuff</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="XWYbYOv" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/XWYbYOv">
Trippy pop art with fade</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="yLENQyr" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/yLENQyr">
Trippy pop art waves</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

This one’s my favorite 😄

## Card with fancy border

The last thing I did was create this card with a fancy gradient border, inspired by a design I saw somewhere else (I can't remember exactly where), which uses some layering and blending techniques from above but isn’t nearly as experimental or “out there” as some of the previous stuff.

<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="JjZbKbB" data-user="jlzych" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
<span>See the Pen <a href="https://codepen.io/jlzych/pen/JjZbKbB">
Card with fancy border</a> by Jeff (<a href="https://codepen.io/jlzych">@jlzych</a>)
on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Fin

That’s all I’ve got for now. They’re fun to make, and I feel like I could make a lot more of these since each one inspires new ideas. Plus I’m a lot more attuned to seeing gradients and layers in the world now – lights, shadows, clothing, purses, etc. – which makes me want to figure out how to recreate them in CSS.

Bon appétit!
