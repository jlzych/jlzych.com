---
title: Performance comparison of serving fonts through Typekit vs Cloud.typography
date: 2013-08-15 22:40 PDT
tags: performance
---

On [optimizely.com](https://www.optimizely.com), we just switched our typeface from Proxima Nova (via [Typekit](http://typekit.com)), to Gotham (via Hoefler & Frere-Jones [Cloud.typography](http://typography.com)). Gotham has long been what we used in Photoshop mocks, but we made the switch mostly because it just looks better. We've long known that Typekit can be a bottleneck to our page load, so I took this opportunity to compare the performance impact of each service.

*Note: these are just some quick comparisons of the speeds based on my machine using optimizely.com. Your experience may vary.*

## Typekit

To use Typekit, you must insert JS in the head of your page, like so:

```html
<script type="text/javascript" src="//use.typekit.net/abc1def.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
```

It's well known that script tags in the `<head>` of the document block page rendering. If the Typekit service is down, or slow, the page can take a significantly long time to render.

This script determines which fonts to serve to the user [based on their OS and browser](http://blog.typekit.com/2012/08/16/performance-improvements-to-font-serving/).

Based on a few pageloads on my Macbook Pro and looking through Chrome's timeline, Typekit's JS takes about 300ms to download and 900ms to download the actual fonts, for a total of about 1100ms. Additionally, the script sets a timeout fires until the fonts have loaded, consuming processing power (typically not an issue, but could potentially be significant on mobile). Finally, 410kb of fonts are downloaded (font size and download time both depends on the OS and browser).

## Cloud.typography

To use Cloud.typography, you need to add a `<link>` tag in the `<head>` of your page, like so:

```html
<link rel="stylesheet" type="text/css" href="//Cloud.typography.com/1234567/123456/css/fonts.css">
```

Unlike Typekit, Cloud.typography requires you to host the font files on your own servers (CDN, web server, etc.). Depending on your infrastructure, this could be a big advantage over Typekit. But Typekit also servers its fonts over a CDN, so this is unlikely to be much of a gamechanger, speed-wise.

When the page loads, one request is made to `fonts.css`. Their server then does some work to determine which CSS file to redirect to (based on OS and browser), and then sends back a response of `302 Moved Temporarily` with the `Location` header set to the path of one of the CSS files you uploaded. Most fonts are encoded as data-uris in the stylesheets (unless you're IE and need references to `.eot` files). This means there are 2 requests (for most browsers), and all the work of determining which fonts to return to the user is done on their servers (instead of on the user's machine via JS with Typekit).

Based on a few pageloads in Chrome on my computer, the fonts took about 800ms to load (~200ms for `fonts.css`, and another 600ms for the CSS file with the actual fonts). The fonts are 251kb in Chrome, but are between 100 and 500kb depending on the OS and browser.

I also did some tests on [webpagetest.org](http://webpagetest.org) from various locations, and found in total the fonts take between 300ms (France and Russia) and 1000ms (Brazil and San Jose) to download (this includes the 302 response from `fonts.css` and downloading the CSS file from your servers). Unfortunately I don't have this comparison data for Typekit.

## Takeaways

On [optimizely.com](https://www.optimizely.com), Cloud.typography edges out Typekit for load times (about 800ms vs 1100ms on my computer, or about 27% faster). Part of this can be attributed to the obvious fact that the size of the fonts is smaller with Cloud.typography, which is largely because we're serving fewer fonts to the user than we did with Typekit.

However, Typekit blocks rendering by having a `<script>` tag in the head of the document, whereas Cloud.typography uses a `<link>` tag that allows the page to continue [rendering progressively](http://developer.yahoo.com/performance/rules.html#css_top).

Additionally, Typekit taxes the user's machine by executing Javascript to determine which fonts to load, whereas Cloud.typography does this on their servers. Although the JS is pretty minimal, it could impact older or more resource-constrained machines. Personally, I like that Cloud.typography moved this logic off of users' machines and onto their servers.

## Conclusion

In the end, both services are solid and the speed difference is minimal. I like Cloud.typography's approach of only having a link to a CSS file instead of executing javascript, and the ability to host files yourself is nice. But which service you choose should ultimately come down to whichever fonts you like more.
