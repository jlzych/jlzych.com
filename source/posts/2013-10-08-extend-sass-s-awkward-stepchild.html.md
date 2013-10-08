---
title: Extend - SASS's Awkward Stepchild
date: 2013-10-08 09:47 PDT
tags: SASS, css, extend
---

SASS has a lot of really powerful features to help you write [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) code quickly. One such feature is `@extend`, which I find is overlooked by many developers but can be very useful when used properly.

## @-what?

First, a little background on `@extend`. It allows a selector to _extend_ the styles of another selector, essentially providing a form of sub-classing. `@extend` works by combining selectors into a single comma-separated selector. A simple example:

```scss
.button {
  color: #bada55;
  font-size: 1em;
}

.button-small {
  @extend .button;
  font-size: 0.8em;
}
```

Which outputs:

```css
.button,
.button-small {
  color: #bada55;
  font-size: 1em;
}

.button-small {
  font-size: 0.8em;
}
```

The [SASS docs](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#extend) give a fuller explanation of how it works, and its limitations.

## Why it's great

`@extend` can cut down duplicate styles and selectors. Modules derived from a base style can all `@extend` the parent, and all the sub-classes will be added to the base selector. Alternative ways to achieve this in SASS include using mixins to output the base styles (which just adds bloat to the stylesheet, since the same set of rules is output multiple places in the final CSS); duplicate the properties in each selector (violates the principle of DRY and is a maintenance nightmare); or manually add each new selector to the base selector (also violates DRY and also is a maintenance nightmare, and the exact problem `@extend` was designed to solve).

### Placeholder selectors

Placeholder selectors make `@extend` even sweeter. They are selectors that aren't output unless extended by another selector (also known as [abstract classes](http://en.wikipedia.org/wiki/Abstract_type) in OOP). It doesn't sound like much, but I often run into situations where I have some classes (or elements) that share common styles, but I don't need the base class in the HTML or CSS. For example:

```scss
.container-blue,
.container-red {
  padding: 3em 0;
  width: 100%;
}

.container-blue {
  background-color: blue;
}

.container-red {
  background-color: red;
}
```

Each container selector has to be typed out twice -- once for their shared styles, and again for their specific styles. Not a big deal here, but quickly becomes unweildy the more sub-containers you add. Placeholder selectors can help us here:

```scss
%container-common-styles {
  padding: 3em 0;
  width: 100%;
}

.container-blue {
  @extend %container-common-styles;
  background-color: blue;
}

.container-red {
  @extend %container-common-styles;
  background-color: red;
}
```

Now the common styles are in one place, and each class is in one place. This pays off the more selectors you have extending the placeholder.

You can also feel guilt-free about using unsemantic, descriptive names, since the placeholder itself isn't output in the final CSS. They are purely for yourself and other developers.

## Dangers of @extend

As with any SASS you write, you need to keep an eye on the final CSS it outputs. If you `@extend` a class that's used in many places, the selector will be copied to every instance of that class (even if it's nested in other selectors). This is often unnecessary, and can cause unintended side effects (I ran into a nasty styling bug because of this once).

For example, a `.button` class is originally defined in one place, but modified to look slightly different in a dialog. When extending it, you only wanted the original styles, but the new selector is copied into the dialog button as well. This wasn't what you intended, isn't necessary, and bloated your final CSS. Before extending classes, check everywhere they're defined and make sure you want your selector to be duplicated in all of those places. (Arguably, this is bad CSS to begin with [you shouldn't change a button style based on the dialog context in the first place], but in real world CSS it happens).

Additionally, the depth and breadth of selectors you have nested under the base selector, combined with the number of selectors extending the base, can create some _very_ long selectors, not all of which are necessary. Once again, pay attention to the CSS that's being compiled. And once again, this is arguably bad SASS (mind the [Inception Rule](http://thesassway.com/beginner/the-inception-rule)), but these things happen in legacy codebases with multiple developers.

## Closing Thoughts

Extending selectors can save you time and DRY out your code, when used properly. As with most SASS features, it can be abused and create some pretty hairy CSS, but as long as you keep an eye on the final CSS you'll be fine.
