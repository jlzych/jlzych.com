---
title: Automating Semantic Sprites with Compass
date: 2013-09-01 21:15 PDT
description: "In my previous post, I explained how to use image sprites semantically. But as with all image spriting, setting each sprite's size and position is a pain. Compass can automate this, but it's designed with the assumption that all your sprites will be background images of elements."
tags: "frontend dev"
---

In my [previous post](http://jlzych.com/2013/08/26/a-more-semantic-approach-to-spriting-images/), I explained how to use image sprites semantically. But as with all image spriting, setting each sprite's size and position is a pain. [Compass](http://compass-style.org) can automate this, but it's designed with the assumption that all your sprites will be background images of elements. Even so, Compass provides a number of under-documented functions that can help automate my technique.

## Refresher

First, a quick summary of my [previous post](http://jlzych.com/2013/08/26/a-more-semantic-approach-to-spriting-images/). The [standard way to sprite images](http://css-tricks.com/css-sprites/) is to set the sprite sheet as the `background-image` of an element, and set its `background-position` to the coordinates of the image you want to display. But if your image is part of the content, then semantically it should be in the markup as an `img` tag. To accomplish this, set the `img` tag's `src` to the sprite sheet, and use a container element as a "window" to let one sprite show through at a time. For the specifics of how to do this, [read my post](http://jlzych.com/2013/08/26/a-more-semantic-approach-to-spriting-images/).

## Automate this with Compass

As I mentioned, the most difficult part of spriting is setting the image size and position for each sprite. Luckily, Compass can help us, but their [spriting documentation](http://compass-style.org/help/tutorials/spriting/) is geared towards the standard technique, and thus doesn't provide much help to accomplish my method. But fear not! Compass can still help us.

### Create the sprite sheet

The first step to doing any spriting in Compass is to `@import` a folder of images. Compass will generate a sprite sheet image, and create a number of variables that we can use to get the size and position of each sprite.

```scss
@import "sprites/*.png";
```

### Sprite Dimensions

Next, we need to get the dimensions of each sprite, and set the container element to that size. Compass provides a `sprite-dimensions` function, which takes 2 parameters: the sprite map Compass generated, and the name of the sprite (i.e. the filename, sans extension). Then it outputs the `width` and `height` of the sprite. If you have no idea what you're supposed to pass as the sprite map parameter, you're not alone. After [some digging](https://github.com/chriseppstein/compass/blob/stable/lib/compass/sprite_importer/content.erb#L16), I discovered Compass assigns the sprite map to a variable named `$<folder>-sprites`. In this example, that makes the variable the awkwardly named `$sprites-sprites`.

```scss
@include sprite-dimensions($sprites-sprites, "my-sprite");
```

### Sprite Position

The next step is to set the `top` and `left` properties of the image tag. Once again, Compass provides us a helper function: the aptly named `sprite-position`. Like `sprite-dimensions`, it also takes the sprite map and sprite name as parameters. But unlike `sprite-dimensions`, it provides us the `left` and `top` properties concatenated in a string, e.g. "20px 120px". This seems weird and inconsistent at first, until you realize it's designed to be used as the value of the `background-position` property. To help us access each value individually, SASS has a function named `nth`, which returns the value at the position you pass it (starting from 1). And don't worry about converting that string to an array &mdash; SASS will automatically convert strings to arrays, splitting the string on spaces. So that gives us:

```scss
.my-sprite img {
  $position: sprite-position($sprites-sprites, "my-sprite");
  left: nth($position, 1);
  top: nth($position, 2);
}
```

### Putting it All Together

So now we have all the pieces in place to position each individual sprite, and all we need is the name of each image. For example:

```scss
@import "sprites/*.png";

.sprite-container {
  display: block; // or inline-block
  overflow: hidden;
  position: relative;

  &.my-sprite {
    @include sprite-dimensions($sprites-sprites, "my-sprite");

    img {
      $position: sprite-position($sprites-sprites, "my-sprite");
      position: absolute;
      left: nth($position, 1);
      top: nth($position, 2);
    }
  }

  // ...etc. for each sprite
}
```

The obvious flaw here is that you need to write code for each sprite in the sprite sheet. Luckily for us, Compass has one more trick up its sleeve to help automate this: the [`sprite_names`](https://github.com/chriseppstein/compass/blob/stable/lib/compass/sass_extensions/functions/sprites.rb#L14) function. Pass it a sprite map, and it outputs a list of sprite names. Then we can use `@each` to loop through the list, and generate the size and position of each. Bringing it all together, our code looks like this:

```scss
@import "sprites/*.png";
$sprite-names: sprite_names($sprites-sprites);

.sprite-container {
  display: block; // or inline-block
  overflow: hidden;
  position: relative;

  @each $sprite in $sprite-names {
    &.sprite-#{$sprite} {
      @include sprite-dimensions($sprites-sprites, $sprite);

      img {
        $position: sprite-position($sprites-sprites, $sprite);
        position: absolute;
        left: nth($position, 1);
        top: nth($position, 2);
      }
    }
  } // @each
} // .sprite-container
```

## Conclusion

Whew, that was a whirlwind of Compass code. But once you get it all set up, it works quite well. You can add and remove sprites as you please, without needing to update a single line of SCSS. Happy spriting!
