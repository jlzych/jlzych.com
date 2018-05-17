---
title: Color Saver
date: 2016-01-24 15:33 PST
description: "This weekend I built a quick Mac screensaver that displays the current time as a color. The hour is mapped onto the red channel, the minute onto the green channel, and the second onto the blue channel."
tags: projects
---

This weekend I built a quick Mac screensaver that displays the current time as a color. The hour is mapped onto the red channel, the minute onto the green channel, and the second onto the blue channel.

I was inspired by [What Colour Is It](http://whatcolourisit.scn9a.org/), which converts the current time into a hex value (e.g. 11:02:47 is `#110247`). But What Colour Is It doesn't map to every hex value. Its range is limited to `#000000` (midnight, AKA black) to `#235959` (11:59:59 PM, a darkish blue green), which misses brighter colors closer to white (`#FFFFFF`). Instead, Color Saver maps the time component onto the full range (0–255) of each color channel.

I experimented with mapping the time components onto hue, saturation, and lightness instead, but that resulted in more ugly colors more often. For example, when seconds represent the color's lightness, the color will go from completely black to white in the course of a minute, every minute of the day. I found this to be jarring and unpleasant. Mapping onto the RGB channels instead is more calming and mesmerizing.

[Download Color Saver from Dropbox.](https://www.dropbox.com/s/7ab1d8s9vqoxuht/ColorSaver.saver.zip?dl=0) _Note: I didn't code sign the screensaver, so when you double-click to install it you'll get a warning that it's from an untrusted source. You'll have to make an exception in the "Security & Privacy" section of System Preferences to install it._

Feel free to check out the [source code on Github](https://github.com/jlzych/ColorSaver).
