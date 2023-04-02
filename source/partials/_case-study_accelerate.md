## The challenge

LaunchDarkly’s core product is a feature flagging platform for developers. We had good product-market fit and solid revenue and expansion numbers, but we needed a third product offering (the second being our experimentation product) so we would have multiple income streams to shore up the business for an eventual IPO.

In this project, I started as the Head of Product Design and worked with leadership to develop & validate the core idea, then moved into a hands-on role to design the product itself. We put a small team on it to operate as a startup-within-a-startup, moving fast with minimal overhead. I designed the product from the ground up, taking fuzzy, ambiguous problem areas and wrestling them down to concrete designs to build. In my time on the team I…

- Created a flexible and scalable information architecture and navigation scheme
- Developed design patterns and components that helped us rapidly spin up new pages and features
- Wrote product and design principles to guide our decision making
- Interviewed customers to hone our target persona, jobs-to-be-done, and value we’re delivering
- Developed and executed a learning plan to drive us to product-market fit
- Designed a light-mode and dark-mode theme

## The solution

<a href="/images/case-studies/accelerate/1-accelerate-final.png">
  <img src="/images/case-studies/accelerate/1-accelerate-final.png" />
  <em>Accelerate’s primary overview page that shows a summary of all your quality and velocity metrics in one place</em>
</a>

Accelerate’s primary overview page that shows a summary of all your quality and velocity metrics in one place

We ended up building **Accelerate**: a product for engineering leaders to track and improve quality and velocity by combining key metrics in one place to highlight bottlenecks and track long-term trends.

The idea came from our customers champions. They would ask us, “We’ve rolled out feature flagging across our engineering department, and want to know if that’s improved our velocity and quality. Can you help us measure that?” We had no answer for them.

By using feature flagging, LaunchDarkly should be improving quality and velocity. The DORA (DevOps Research and Assessment) movement was on the rise, which defines 4 metrics for measuring that: deploy frequency, lead time, change failure rate, and mean-time-to-resolution.

A handful of products were popping up to measure these metrics for engineering teams, but there was a gap in the market: none of them were able to take into account feature flagging’s impact to these metrics. By combining the DORA metrics with flagging data, we could create a truly unique product.

<div class="cs-image-grid">
  <a href="/images/case-studies/accelerate/2-deploy-freq.png">
    <img src="/images/case-studies/accelerate/2-deploy-freq.png" />
    <em>The deployment frequency metric page</em>
  </a>

  <a href="/images/case-studies/accelerate/3-lead-time.png">
    <img src="/images/case-studies/accelerate/3-lead-time.png" />
    <em>The lead time metric page</em>
  </a>

  <a href="/images/case-studies/accelerate/4-release-frequency.png">
    <img src="/images/case-studies/accelerate/4-release-frequency.png" />
    <em>Release frequency metric page</em>
  </a>

  <a href="/images/case-studies/accelerate/5-flag-health.png">
    <img src="/images/case-studies/accelerate/5-flag-health.png" />
    <em>Flag health metric page</em>
  </a>

  <a href="/images/case-studies/accelerate/6-flag-coverage.png">
    <img src="/images/case-studies/accelerate/6-flag-coverage.png" />
    <em>Flag coverage metric page</em>
  </a>
</div>

## How we got there

We kicked things off with a team of 6: myself as the product designer, a combination Director of Engineering and product owner, and 4 engineers. We were starting with a blank canvas, so the first thing I did was run a workshop for us to review the competitive landscape, and collect screenshots of general charting and data tools that people like (and dislike). This was put into a “competitive and inspiration board” in FigJam that I referred to throughout my time on the team.

<a href="/images/case-studies/accelerate/7-competitive-figjam.png">
  <img src="/images/case-studies/accelerate/7-competitive-figjam.png" />
  <em>The big FigJam board of competitive screenshots and tools in similar spaces. Also Dribbble shots for pretty inspiration.</em>
</a>

<div class="cs-image-grid">
  <a href="/images/case-studies/accelerate/8-comp-closeup.png">
    <img src="/images/case-studies/accelerate/8-comp-closeup.png" />
    <em>Close-up of competitive screenshots</em>
  </a>

  <a href="/images/case-studies/accelerate/9-comp-analytics.png">
    <img src="/images/case-studies/accelerate/9-comp-analytics.png" />
    <em>Close-up of general analytics screenshots</em>
  </a>
</div>

### First metric screen

When you have a blank canvas, the hardest part is knowing where to start. We discussed this as a team, and ultimately decided the best starting point was the deployment frequency metric: it was easy to calculate, and easy to get the data. For me, this was an opportunity to set the pattern for how most of the screens in the product would look. The product is primarily metrics, so nailing the first one would make the rest of them faster to design and build.

To do that I drew on all the inspiration we had collected previously, and explored a ton of lo-fi options of different layouts, functionality, and data.

The key thing to emphasize here is that I was working in an environment of high ambiguity with no product specs or technical constraints (yet). To create clarity out of ambiguity, I dove right in and made lots and lots of lo-fi mocks, throwing everything at the wall to see what would stick. I wasn’t afraid to try out crazy ideas, and had no problem throwing stuff out to get to the really great stuff. I regularly shared these with the team, got their feedback on what was working and what wasn’t, and iterated more.

<a href="/images/case-studies/accelerate/10-lofi-first-metric.png">
  <img src="/images/case-studies/accelerate/10-lofi-first-metric.png" />
  <em>A fraction of the lo-fi options I explored</em>
</a>

<div class="cs-image-grid">
  <a href="/images/case-studies/accelerate/11-lofi-closeup.png">
    <img src="/images/case-studies/accelerate/11-lofi-closeup.png" />
    <em>Close-up of some lo-fi options</em>
  </a>

  <a href="/images/case-studies/accelerate/12-lofi-closeup2.png">
    <img src="/images/case-studies/accelerate/12-lofi-closeup2.png" />
    <em>Another close-up of lo-fi mockups</em>
  </a>
</div>

While I was trying out everything, the engineers were building the data models and figuring out how to ingest the data. Our work was informing each other’s – my mocks helped them get a sense of what calculations and functionality we were likely to have, and their data modeling told me what we could build.

After a lot of back and forth we aligned on an initial set of functionality and calculations, which I turned into a polished hi-fi mock. The basic structure was an inverted pyramid: start with high-level summary metrics, then have a graph, then provide more detailed breakdowns and a table of data below that.

<div class="cs-image-grid">
  <a href="/images/case-studies/accelerate/13-metric1.png">
    <img src="/images/case-studies/accelerate/13-metric1.png" />
    <em>Finished mock of our first metric, deployment frequency</em>
  </a>

  <a href="/images/case-studies/accelerate/14-metric1-redlines.png">
    <img src="/images/case-studies/accelerate/14-metric1-redlines.png" />
    <em>The same finished mock, but redlined to ensure the engineers got all the details right</em>
  </a>
</div>

### Information architecture and navigation

As we built out the first screen, I worked with the product owner on our information architecture and navigation. We discussed the data models and core concepts of the product, as well as our target users’ mental models, to develop a strong system model to work off of.

The core of it is that we have raw data (deployments, PRs, flags, etc.), which we combine into summary metrics (deploy frequency, change failure rate, etc.), which can be filtered by date, environment, team, and application. We turned this into a conceptual model that we built the IA off of (screenshots below).

<div class="cs-image-grid">
  <a href="/images/case-studies/accelerate/15-ia-concept-model.png">
    <img src="/images/case-studies/accelerate/15-ia-concept-model.png" />
    <em>Our working FigJam board of the conceptual model</em>
  </a>

  <a href="/images/case-studies/accelerate/16-ia-core-concepts.png">
    <img src="/images/case-studies/accelerate/16-ia-core-concepts.png" />
    <em>The final conceptual model that we aligned on</em>
  </a>
</div>

Using that system model, I took a similar approach to designing the first screen: I explored a bunch of lo-fi concepts for how to translate the model into a navigation scheme. I built a handful of prototypes to help us assess the “feel” of each model. We tried all the obvious stuff, like a sidebar and top bar and so on, but pushed ourselves to do something more innovative.

We landed on a dashboard experience that eschewed any traditional navigation in favor of showing each metric in cards, and you could click through to the more detailed metrics screens. We did this to put the emphasis on the data itself, and interacting with it, and clicking into and out of it and slicing and dicing it, rather than trying to remember which screen has the number you want.

<a href="/images/case-studies/accelerate/1-accelerate-final.png">
  <img src="/images/case-studies/accelerate/1-accelerate-final.png" />
  <em>Accelerate's finished nav – no nav! Just cards to navigate by</em>
</a>

<div class="cs-image-grid">
  <a href="/images/case-studies/accelerate/17-ia-lofi1.png">
    <img src="/images/case-studies/accelerate/17-ia-lofi1.png"/>
    <em>Screenshot of a lo-fi mock of a discarded navigation scheme</em>
  </a>

  <a href="/images/case-studies/accelerate/18-ia-lofi2.png">
    <img src="/images/case-studies/accelerate/18-ia-lofi2.png" />
    <em>Screenshot of a lo-fi mock of another discarded navigation scheme</em>
  </a>

  <a href="/images/case-studies/accelerate/19-ia-prototype.png">
    <img src="/images/case-studies/accelerate/19-ia-prototype.png" />
    <em>Prototype of the finished "focused experience" no-nav navigation</em>
  </a>
</div>

### Design system

<a href="/images/case-studies/accelerate/20-design-system-comps.png" class="u-float-right cs-img-halfWidth">
  <img src="/images/case-studies/accelerate/20-design-system-comps.png" />
  <em>Some of the components I created in Figma</em>
</a>

As more of the product got built out, I kept creating components and design patterns for us to use throughout the product. This was important because:

- It adds consistency to the product, which makes the product easier to learn and use for our customers
- Makes the product faster to both design and build since we could reach for established patterns rather than design and build everything from scratch. I would often just hand lo-fi mocks to engineers to build off of, and they would know what existing components to use.
- Increases product quality since we can focus on making a handful of components great, rather than building everything bespoke.


## Wrap up

All told, it was a lot of work and a lot of fun. I spent a year on this, and when I left we were nearing the end of EAP and getting ready to officially launch. The learning plan uncovered the gaps to close before launching, which the team is cranking away on.

The early signs I saw while I was there were generally positive: our internal platform team was starting to rely on it, we sunsetted our internal use of our main competitor, and we had engaged accounts in the EAP who were getting value out the metrics we had built. And we got regular feedback that people really liked the clean and simple UI (a big advantage over our competitors). There’s a lot more work to be done, but between the persona and jobs-to-be-done, the navigation and IA, and the design patterns, I set a solid foundation for the team to build on for years to come.


<!--
### Product and design principles

<a href="/images/case-studies/accelerate/21-principles.png" class="u-float-left cs-img-halfWidth">
  <img src="/images/case-studies/accelerate/21-principles.png" />
  <em>A screenshot of our product and design principles</em>
</a>

As we were designing the first few screens and navigation, I realized that myself and the product owner’s decisions were being guided by a few principles that we hadn’t verbalized, but were naturally rallying around. I decided it would be worth it to write those down to make the implicit explicit, and so they could guide the rest of the team.

I can’t share all of them because they’re proprietary information, but a few were “show useful data out of the box”, “contextualize data”, and “encourage exploration.” Each of these came with a short description and rationale, as well as examples of what this principle looks like and doesn’t look like in action.

These helped shortcut a number of conversations, and guided decision making when we had diverging paths to choose from. For example, there were times when we were reviewing mockups and trying to choose between two options, and someone would say, “this one encourages more exploration, so let’s go with that” (and we did).

### Customer development, personas, and jobs-to-be-done

<a href="/images/case-studies/accelerate/22-persona.png" class="cs-img-halfWidth u-float-right">
  <img src="/images/case-studies/accelerate/22-persona.png" />
  <em>A screenshot of the persona write-up</em>
</a>

As we were building the product, the product owner and myself did customer development to get a deeper understanding of what customers wanted out of a product in this space. We had a rough persona in mind from the initial concept – engineering leaders – but we knew we needed to sharpen that. What specifically were they trying to do? What pain points could we solve? Would they be using it themselves, or would one of their lieutenants or a specific team be in charge of it? And so on.

These interviews helped us hone in on our primary user persona of “**Leaders of Engineering Excellence Teams.”** These people report to an engineering leader who cares about these metrics (e.g. a VP of Engineering, or the CTO), and lead a team that’s in charge of improving the efficiency and quality of the overall engineering department.

### EAP Learning Plan

When we started the EAP program, I created a learning plan to focus what we wanted to learn in the EAP, and what questions we would be asking users. We started with the decisions we wanted to make, how we’re measuring EAP success, and what we wanted to learn from customers.

I can’t go into much detail since that information is private and the project is still ongoing, but at a high level we want to know if we’re hitting product-market fit. Accelerate needs to generate revenue for the business, of course, so during the EAP we sought to learn what’s the gap between where we are now and charging for the product? Understanding this would drive our roadmap and shorten time to launch (and thus revenue).

The most immediate strategic decision to make was whether we needed to go deeper on what we had already by making existing metrics and charting better, or go broader by adding more metrics and data sources to give you a fuller picture of engineering quality and velocity.

We generated a lot of interest in the EAP (with the help of sales and customer success orgs) and got almost 60 accounts in the EAP in the first couple of months. This showed us that our vision was resonating with customers, but we weren’t getting as much engagement (i.e. week-over-week usage, telling us there was a gap between the vision and reality.

In the learning plan, we divided our audience between engaged accounts and disengaged accounts. For engaged accounts, we did high touch outreach and created a list of questions to understand what parts of the product they were getting value out of, and what was lacking. For these folks we did a mix of interviews and emails/slacks (some folks we had a warmer relationship with and could just message, others made sense to set up calls).

The big questions to answer were “How disappointed would you be if we took Accelerate away (very, somewhat, not at all?),” and, “Are you willing to pay for Accelerate? Why or why not”. These assess overall product value.

For disengaged customers we created a survey to understand why the product didn’t stick for them. Were we missing metrics? Didn’t integrate with a tool they used? No time to set it up yet?

-->
