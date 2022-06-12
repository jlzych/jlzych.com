---
title: Sol LeWitt - Wall Drawing #273
date: 2017-01-08 15:10 PST
description: "I recently saw Sol LeWitt's Wall Drawing #273 at the SF MOMA, which really stayed with me after leaving the museum. In particular, I like that it wasn't drawn by the artist himself, but rather he wrote instructions for draftspeople to draw this piece directly on the walls of the museum, thus embracing some amount of variability."
relative_image_url: /images/2017-01-08-sol-lewitt-wall-drawing-273/wall7.jpg
tags: ["side project", "frontend dev"]
---

I recently saw [Sol LeWitt's](https://en.wikipedia.org/wiki/Sol_LeWitt) Wall Drawing #273 at the [SF MOMA](https://www.sfmoma.org/), which really stayed with me after leaving the museum. In particular, I like that it wasn't drawn by the artist himself, but rather he wrote instructions for draftspeople to draw this piece directly on the walls of the museum, thus embracing some amount of variability. From the museum's description:

> As his works are executed over and over again in different locations, they expand or contract according to the dimensions of the space in which they are displayed and respond to ambient light and the surfaces on which they are drawn. In some instances, as in this work, those involved in the installation make decisions impacting the final composition.

![Sol LeWitt's Wall Drawing #273](/images/2017-01-08-sol-lewitt-wall-drawing-273/wall7.jpg)
_Sol LeWitt's Wall Drawing #273_

This embrace of variability reminds me of the web. People browse the web on different devices that have different sizes and capabilities. We can't control how people will experience our websites. Since LeWitt left instructions for creating his pieces, I realized I could translate those instructions into code, and embrace the variability of the web in the process. The result is [this CodePen](http://codepen.io/jlzych/full/rjVoby/).

<p data-height="465" data-theme-id="0" data-slug-hash="rjVoby" data-default-tab="result" data-user="jlzych" data-embed-version="2" data-pen-title="Sol LeWitt – Wall Drawing #273" class="codepen">See the Pen <a href="http://codepen.io/jlzych/pen/rjVoby/">Sol LeWitt – Wall Drawing #273</a> by Jeff (<a href="http://codepen.io/jlzych">@jlzych</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

LeWitt left the following instructions:

> A six-inch (15 cm) grid covering the walls. Lines from corners, sides, and center of the walls to random points on the grid.
>
> 1st wall: Red lines from the midpoints of four sides;
>
> 2nd wall: Blue lines from four corners;
>
> 3rd wall: Yellow lines from the center;
>
> 4th wall: Red lines from the midpoints of four sides, blue lines from four corners;
>
> 5th wall: Red lines from the midpoints of four sides, yellow lines from the center;
>
> 6th wall: Blue lines from four corners, yellow lines from the center;
>
> 7th wall: Red lines from the midpoints of four sides, blue lines from four corners, yellow lines from the center.
>
> Each wall has an equal number of lines. (The number of lines and their length are determined by the draftsman.)

As indicated in the instructions, there are 7 separate walls with an equal number of lines, the number and length of which are determined by the draftsperson. To simulate the decisions the draftspeople make, I included controls to let people set how many lines should be drawn, and toggle which walls to see. I let each color be toggleable, as opposed listing out walls 1-7, since each wall is just different combinations of the red, blue, and yellow lines.

The end result fits right in with how [human draftspeople](https://www.google.com/search?q=wall+drawing+273&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwjV6Jub4LPRAhUD1mMKHclqAr4QsAQIIQ&biw=1438&bih=780) have turned these instructions into art. The most notable difference I see between a human and a program is the degree of randomness in the final drawing. From comparing the output of the program to versions done by people, the ones drawn by people seem less "random." I get the sense that people have a tendency to more evenly distribute the lines to points throughout the grid, whereas the program can create clusters and lines that are really close to each other which a person would consider unappealing and not draw.

It makes me wonder how LeWitt would respond to programmatic versions of his art. Is he okay with computers making art? Were his instructions specifically for people, or would he have embraced using machines to generate his work had the technology existed in his time? How "random" did he want people make these drawings? Does he like that a program is more "random," or did he expect and want people to make his wall drawings in a way that they would find visually pleasing? We'll never know, but it was fun to interpret his work through the lens of today's technology.
