---
title: A More Semantic Approach to Spriting Images
date: 2013-08-26 21:24 PDT
tags: html, css
---

Spriting images is a well-known, well-documented way to speed up page load times. The standard technique is to set a sprite sheet image as the `background-image` of an element, and position it so the proper sprite shows through. This works great for icons and other images that aren't part of the actual content, but not so great for images that belong in the page content.

## The problem

Images that are part of the content should be in `img` tags. This is correct semantically, good for accessibility, and good for interoperability. With the typical approach to spriting images, you would need empty container elements that have a `background-image` property. Those empty elements have no semantic meaning, and are worthless to screenreaders and other crawlers that may access your page. This is the situation I found myself in on [Optimizely's homepage](https://www.optimizely.com) when I sprited the customer logos and benefits graphics.

## The solution

Solving this problem is actually fairly simple. First, you'll need markup similar to the following:

```html
<div class="sprite-container sprite-track">
  <img src="sprites.png" alt="Graphic of tracking elements on a web page">
</div>
```

[View the Codepen](http://codepen.io/jlzych/pen/ExLzG)

The `.sprite-container` element acts as a window that only lets one sprite show through. It has the same width and height as the sprite, and has `overflow: hidden` to prevent the other sprites from showing through.

Then the image needs to be positioned so the sprite we want shown is at the top left corner of the window, which is accomplished by setting `position: absolute` and the `top` and `left` properties correctly. SCSS:

```scss
.sprite-container {
  display: inline-block;  // or block
  height: 275px;          // size of the image we want to show
  width: 400px;
  overflow: hidden;       // prevent the other sprites from showing
  position: relative;     // so the image can be positioned absolutely

  img {
    position: absolute;
  }

  &.sprite-track img {
    left: 0;
    top: -210px;
  }

  // other sprites
}
```

Codepen:

<p data-height="268" data-theme-id="0" data-slug-hash="ExLzG" data-user="jlzych" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/jlzych/pen/ExLzG'>ExLzG</a> by Jeff (<a href='http://codepen.io/jlzych'>@jlzych</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

Generating this CSS can be a pain, but I will discuss how to accomplish this with Compass in my next blog post.

## Closing Thoughts

This method lets us use sprites in `img` tags, which is more semantic than empty `div`s or `span`s (depending on the use case). However, it has a couple of drawbacks. First, it requires a container element around your image. This could add unneccessary bloat to your markup (in my case the image already had a parent element). Second, and greatest of all, the image `src` attribute now references an entire sprite sheet, when technically it should only reference the actual image that it's showing. Screenreaders won't care at all, but some services may use this image for other purposes. For example, Facebook grabs a representative image of your page when a link is shared, and it could grab a sprite sheet instead of the actual image. That's no good.

Ultimately it's a tradeoff between having a container element and actual `img` tag in your markup versus an empty element whose background image is a sprite. Overall, I think the pros (semantic HTML; better accessibility) outweigh the cons (container element; `src` attribute is a sprite sheet). If you want to use sprites with actual `img` tags, this is a solid technique. If anyone has any thoughts on how to overcome the drawbacks, hit me up [@jlzych](http://twitter.com/jlzych).
