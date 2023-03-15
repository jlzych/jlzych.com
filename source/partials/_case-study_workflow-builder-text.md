It’s 4am. Your alarm’s going off. You’re bleary-eyed and tired but have to log into LaunchDarkly to rollout your new feature to 5% of your audience. Then you’ll have to do that again the next day to another 5%. And again the next day. And so on until it’s rolled out to 100% of your users.

<aside class="callout callout-right">
  <h4>Project at-a-glance</h4>

  <p>
    <strong>My role</strong><br />
    Shaping and directing the work as the Head of Product Design (at start), then the sole Product Designer (for GA launch)
  </p>

  <p>
    <strong>Company</strong><br />
    LaunchDarkly, the #1 platform for managing feature flags
  </p>

  <p>
    <strong>Target customer</strong><br />
    Developers & release managers
  </p>

  <p>
    <strong>Team</strong><br />
    I worked with the leadership team (Co-founder/CTO, SVP Eng/Product) to shape the solution, then a product manager, product designer, engineering manager, and 5 engineers to build and release from early access program (EAP) through a full launch to all Enterprise customers.
  </p>

  <p>
    <strong>Timeline</strong><br />
    Aug. 2021 to Jan. 2022 (launch to all Enterprise customers), with an early access program starting in Nov. 2021 (EAP start)
  </p>

  <p>
    <strong>Impact</strong>
    <ul>
      <li>Steady adoption from EAP through GA
      <li>Some of our biggest accounts rely on it for feature launches
      <li>Customer quote: <em>Feature Workflows saves my team time, helps us to avoid mistakes, and enables us to stage automatic rollouts.</em> —James Pipe, Head of Product at DroneDeploy
    </ul>
  </p>

  <p>
    <strong>Skills used</strong>
    <ul>
      <li>Leading workshops
      <li>Directed work of a product designer
      <li>Customer interviews
      <li>Flows, wireframes,and visual design
    </ul>
  </p>
</aside>

These are the hoops we made our customers (and ourselves) jump through every time they launched a new feature. It was a painful, manual, and occasionally error-prone process. It was an obvious pain point that we should solve, and one that no competitor had a solution to, either.

Our solution was the **Workflow Builder**: a visual way to automate feature launches in LaunchDarkly.

<a href="/images/case-studies/workflow-builder/1-finished-wfb.png">
  <img src="/images/case-studies/workflow-builder/1-finished-wfb.png" class="cs-img-halfWidth" />
  <em>Screenshot of the finished workflow builder</em>
</a>

## How’d we get to the workflow builder?

The pain I described above was well-known to the co-founder — both from experiencing it firsthand, and from talking to customers. As such, he had already had a vision in mind: most software launches are a repeatable process, so we should let customers automate that in LaunchDarkly. Not only would it save time, toil, and prevent errors, but it would be a competitive differentiator to further cement our place as the market leader.

To turn this vision into reality, myself and the PM ran a day-long **workshop** with the co-founder and VP of Engineering & Product.

The first half of the day was **opportunity framing**: what pain points do customers currently have, what are their release processes, and how have other products solved similar challenges (we didn’t look at direct competitors, since they didn’t have anything like this, but rather automation products like Zapier).

The second half of the day was **solution exploration**: whiteboarding all the pieces of the finished solution. We started high-level going through all the screens we’ll need and the places in the product that we’ll need to update, then dove into fleshing those out with more sketches.

<div class="cs-image-grid">
  <a href="/images/case-studies/workflow-builder/workshop1.jpg">
    <img src="/images/case-studies/workflow-builder/workshop1.jpg" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/workshop2.jpg" class="cs-gridItem-2h">
    <img src="/images/case-studies/workflow-builder/workshop2.jpg" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/workshop3.jpg">
    <img src="/images/case-studies/workflow-builder/workshop3.jpg" />
    <em>Caption</em>
  </a>
</div>

Some of the key challenges we had to solve were:

- Release processes all have similar contours, but the specifics are unique for every organization. Building common launches into LaunchDarkly (like a progressive rollout, or alpha → beta → GA launches) would make for a really easy-to-use feature, but it wouldn’t be flexible enough to do it the exact way each customer does it. So our main challenge was: how do we create a solution that’s flexible enough to support any process, while not being overwhelming or confusing to set up?
- Where do you access this feature? The main feature flag page is already bursting at the seams, so we needed to balance discoverability with not disrupting existing core user flows.
- When a workflow is running, how would a user know that when viewing a feature flag? This was especially important because *teams* build software, not individuals, so if person A starts a workflow, person B may not be aware of that when making changes to the flag (which could lead to errors, like the wrong end users seeing a feature still in development).
- How do I manage workflows? Where can I see all that exist, stop them, modify them, etc.? Can I re-use them? If so, how?

The bulk of the afternoon was spent whiteboarding solutions to these challenges, and poking holes in each other’s ideas to ensure we were thinking through the problems from every angle. By the end of the day we had a sketch of the overall system, the primary screens that would need to be built, and some foundational product and design decisions that underlie the whole system and would guide the team as they fleshed out the details.

### Foundational product and design decisions

- **Workflows should be visualized from top to bottom**: Rationale: top-to-bottom is common in other workflow products (like Zapier), and visually represents the idea of a timeline well. It allows space for long, complex workflows (like some of our customers have), while making it easy to build.
- **Workflows should be built one step at a time**: some customers have have long, complex release processes, so to make that manageable they should add a step at a time, and we’ll provide relevant, valid options rather than presenting everything you could do with a flag and asking them to sort through the options.
- **Use intelligent default values, and make them easy to change**: Using intelligent defaults (like filling in the first step to start “Now” and having a blank action ready to be filled so that people feel a sense of progress and aren’t facing down a blank page), will guide people through the process, and make it less overwhelming and daunting.
- **Each step of the workflow should be directly manipulable**: Editing steps directly inline, rather than opening modals or drawers, will help people get in a flow of creating a workflow, and be less UI to learn.
- **Stages should be implicit and optional**: The feature has a concept called “stages” that group sets of actions together. For example, customers frequently do make multiple changes to a flag at one time, but think of them as one “set” of changes. We decided to support this by grouping sets of changes into “stages”, but we decided that we should do this implicitly and make it optional for users to set this themselves, in order to simplify the creation of workflows.
- **Visualize workflows as a summarized timeline**: We want to show workflows in various places in the product, so a summarized timeline view will give us a compact, visual component to use in various places.

## Upping the fidelity

At the end of the workshop we felt pretty confident in the overall solution. It didn’t answer every question (nor should it – that was the team’s job), but it was a solid base to start from. The next day I turned our whiteboard sketches into lo-fi mockups. I did this to:

- Make sure there were no gaps in our reasoning
- Confirm with the leadership team that this matched what we discussed (turning sketches into even slightly-higher-fidelity mocks can expose if we each had different pictures in our heads)
- Have artifacts to hand off to the team who would build this (that were clearer than whiteboard sketches)

Urgency was important here because we wanted to launch an early access program (EAP) in November at our annual user conference, and it was already August, so I spent about a day doing quick-and-dirty mocks. I didn’t get bogged down in the details and just focused on the core screens and flows we had discussed the previous day.

<div class="cs-image-grid">
  <a href="/images/case-studies/workflow-builder/lo-fi-system-sketch.png" class="cs-gridItem-2w">
    <img src="/images/case-studies/workflow-builder/lo-fi-system-sketch.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/lo-fi-flow1.png">
    <img src="/images/case-studies/workflow-builder/lo-fi-flow1.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/lo-fi-flow2.png">
    <img src="/images/case-studies/workflow-builder/lo-fi-flow2.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/lo-fi-flow3.png">
    <img src="/images/case-studies/workflow-builder/lo-fi-flow3.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/lo-fi-flow4.png">
    <img src="/images/case-studies/workflow-builder/lo-fi-flow4.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/lo-fi-otherscreens.png" class="cs-gridItem-2w">
    <img src="/images/case-studies/workflow-builder/lo-fi-otherscreens.png" />
    <em>Caption</em>
  </a>
</div>

I got a quick thumbs up from leadership that everything matched what we discussed, and from there we reviewed these mocks with the team who was going to build it. Overall everything was clear, and the questions were mostly about specific details that we were leaving up to the team to fill in. No questions they raised upended any of our original thinking.

My role transitioned into **overseeing the work of the designer** to make sure his finished designs matched our vision.

### Usability testing

After the product designer fleshed out our lo-fi mocks, he ran usability tests with about 7 people — a mix of internal users and customers. Learnings:

- Overall usability was good. Everyone was able to set up workflows successfully, and understood what was being shown to them on the screen. ~~The vertical layout, and directly manipulable steps (two of our guiding principles) were intuitive to use.~~
- People really liked seeing active workflows when looking at a feature flag, confirming our intuition that surfacing upcoming changes would be important.
- We got feature requests around wanting more types of flag targeting changes in the workflow builder.
    - We originally started with a small subset of changes you could make in order to 1. Simplify the builder (not every type of action made sense in the context of setting up a release process), and 2. Reduce scope to the minimum useful feature set to turn on for select customers in the EAP. It wasn’t surprising that people asked for more during testing, but it was validating that the feature as a whole is useful (they want more of it!), and it helped us prioritize which targeting changes to add next.
- Got at least one feature request for saving these workflows as templates, which was functionality we discussed in the workshop but didn’t spend time sketching. We had a strong hunch that people would want to re-use workflows, so it was validating to get this feature request.
- As with all usability testing there were details to polish, like unclear wording, confusing iconography, the state of current vs upcoming workflows, and so on, which we updated before the EAP.

### Early Access Program

<aside class="callout callout-right">
  <h4>EAP exposes a gap</h4>

  <p>We discovered one important gap to fill: workflows that required approval didn’t link to the page where you could approve or deny that request. Users would have to leave the workflow and navigate through the rest of the product to get to the approval request page, creating unnecessary friction that could easily be solved by linking directly to this page (approval requests are like pull requests in GitHub, and we weren’t linking to it).</p>

  <details>
    <summary>Keep reading</summary>

    <p>The fix was relatively simple: add a button to view the approval request.</p>

    <p>I like this story because it highlights the importance of early access programs for big launches like this: it was an obvious gap once a customer pointed it out, but we hadn’t thought of it upfront or caught it in usability testing. It’s the type of enhancement you find only through real-world usage.</p>

    <a href="/images/case-studies/workflow-builder/add-approval-request-button.png">
      <img src="/images/case-studies/workflow-builder/add-approval-request-button.png">
    </a>
  </details>
</aside>

In mid-November (just over 3 months after the workshop) we launched the Early Access Program to let select customers use the feature and give us feedback before we launched to all Enterprise customers.

About this time the designer working on this project left, so I took over primary design responsibilities. Myself and the PM did follow up conversations with EAP users and watched FullStory sessions to learn what needed to be improved before launch.

Most of the feedback matched what we heard in the usability testing: the feature was broadly useful and valuable, but people wanted to use more flag targeting changes, and wanted to save workflows as templates.

<div class="cs-image-grid">
  <a href="/images/case-studies/workflow-builder/eap-builder.png">
    <img src="/images/case-studies/workflow-builder/eap-builder.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/eap-wf-bubbles.png">
    <img src="/images/case-studies/workflow-builder/eap-wf-bubbles.png" />
    <em>Caption</em>
  </a>

  <a href="/images/case-studies/workflow-builder/eap-wf-tab.png">
    <img src="/images/case-studies/workflow-builder/eap-wf-tab.png" />
    <em>Caption</em>
  </a>
</div>

## Preparing for launch

In addition to the feedback we got during the EAP, there was some functionality we had already planned to build for the full launch: adding our first built-in workflow of a progressive rollout (this is the scenario described at the beginning), upsells for non-Enterprise accounts, and a read-only view of workflows past, present, and future.

![Progressive rollout](/images/case-studies/workflow-builder/progressive-rollout.png)

<aside class="callout">
  <h4>Sidebar: Design details of workflow builder read-only view</h4>

  <p>An enhancement we added for GA was the ability to view in-progress and completed workflows in a read-only view. This view needed to:</p>

  <ul>
    <li>Show the steps of the workflow without letting people edit them
    <li>Make it clear what had already ran, what was currently running, and what had yet to run
  </ul>

  <details>
    <summary>Read on for detailed design decisions</summary>

    <p>The team and I discussed three options of increasing complexity and effort: crawl (just show the workflow builder with disabled fields, no distinguishing completed steps from incomplete. Least effort), walk (show which stages had completed, but not individual steps. Medium effort), and run (use iconography and color to distinguish completed steps and stages from incomplete ones).</p>

    <p>The next day I shared quick-and-dirty mockups with the team. The purpose of these mocks was to more concretely discuss level of effort, appetite, and user experience tradeoffs. They were not intended as finished mocks to build, hence I prioritized speed over quality.</p>

    <a href="/images/case-studies/workflow-builder/wfb-read-only-artboard1.png">
      <img src="/images/case-studies/workflow-builder/wfb-read-only-artboard1.png">
    </a>

    <p>After reviewing them we decided the “run” approach wasn’t that much additional effort, and it was a much better experience, so I got to work finalizing that path.</p>

    <p>The main detail I wanted to get right was clearly distinguishing which steps had already run from those which hadn’t run. Those that hadn’t run could be in one of two states: it’s either the step we’re currently on, or it will run at a future time. So each step could be in one of three states: already ran, currently running, and will run. The screenshot below shows the Figma artboard of all the explorations I did.</p>

    <a href="/images/case-studies/workflow-builder/wfb-read-only-whole-artboard.png">
      <img src="/images/case-studies/workflow-builder/wfb-read-only-whole-artboard.png">
    </a>

    <p>Since each step could be in 1 of 3 states, I needed to choose a *visual hierarchy* to focus your attention on the right places. Without that, the page will be a jumble that’s hard to make sense of. When viewing this page, the most urgent thing to know is what’s currently running, followed by future steps (since these two states represent what will happen to your flag’s targeting in the future, and if those are incorrect you can stop the workflow), and least important is the steps that have already ran.</p>

    <p>To get these states visually and hierarchically correct, I played with iconography, color, and shadow. I made past steps recede by graying them out and removing the shadow, current steps jump out by being white and having a drop shadow, and future steps are just white with no shadow.</p>

    <p>Past steps also got a check mark to communicate they successfully ran. Future steps got no icon, and the current step got an “in-progress” icon.</p>

    <p>I spent the bulk of my time on the iconography. The variables I played with were position (in the step? outside? in the corner? just on the stage?), color & background (did grayscale suffice? how bright? Should it be in a background circle or just a naked icon? Color the background or the icon?), and size (it should be big enough to be easily noticeable, but not big enough to overwhelm the step or throw off the visual balance). Below is a closeup of a section of the Figma artboard showing some of these explorations.</p>

    <p>Additionally, choosing the right “in-progress” icon was a challenge. An icon for something that is complete is well-worn territory: a check mark. But what about in progress? I tried just an amber circle, an amber ring, an hourglass, a watch, and a few others, but none were immediately clear that they meant “current” or “in progress”.</p>

    <p>Our design system uses Material Icons, which doesn’t include any kind of “in-progress” icon by default, so I searched [Material Design Icons](https://materialdesignicons.com/), which is a community site where people upload icons they made in the style of Material Icons to fill in the gaps in the official library. I found an in progress indicator that was a ring with one half a solid stroke, and the other half a dashed line. I put it on an amber background, reviewed it with the design team, and decided it did the best job of communicating in progress of any of the options.</p>

    <a href="/images/case-studies/workflow-builder/wfb-read-only-icon-closeup.png">
      <img src="/images/case-studies/workflow-builder/wfb-read-only-icon-closeup.png">
    </a>

    <p>This is the final design I landed on, marked up for the engineers to make sure they got all the details right for each stage (also included is the flow to delete a workflow).</p>

    <a href="/images/case-studies/workflow-builder/wfb-read-only-final.png">
      <img src="/images/case-studies/workflow-builder/wfb-read-only-final.png">
    </a>
  </details>
</aside>

## Wrap up

<aside class="callout callout-right">
  <h3>Impact</h3>

  <ul>
    <li><strong>70+ workflows</strong> were ran by <strong>30+ users</strong> in the 2 month EAP period. These numbers represent the majority of people in the EAP ran at least one workflow, and many ran multiple, validating the feature’s value.
    <li><strong>Usage steadily grew after GA</strong>, with almost <strong>300 workflows</strong> being run within 3 months of launch. Some of our biggest customers became regular users of the feature (I’d tell you who but that’s confidential 🤫).
    <li>Customer quote: “Feature Workflows saves my team time, helps us to avoid mistakes, and enables us to stage automatic rollouts.” —James Pipe, Head of Product at DroneDeploy
    <li>We didn’t track sales influenced by this feature, but it’s part of the demo to prospects, and anecdotally it <strong>sells well to release managers and engineering leaders</strong> for the time it can save teams.
    <li>A <strong>customer gave a talk</strong> at Trajectory (our annual user conference) about using LaunchDarkly Workflows to automate progressive delivery
    <li><a href="https://launchdarkly.com/blog/easy-feature-releases-with-workflows/">Blog post announcing the feature</a>
  </ul>
</aside>

We set out to automate release process, and reduce the toil and pain of doing it manually. No more 5am wakeups. So how well did we do?

The co-founder had a vision of how he wanted this solved, an ahead of the GA launch he said, “This is a strong opening salvo.” (This may not sound like much, but if you knew him you’d know this was high praise).

But more importantly, what was the customer impact? In the 3 months after launch, 300 workflows had been run, and some of our biggest customers had begun automating their releases. In the words of James Pipe, Head of Product at DroneDeploy, “Feature Workflows saves my team time, helps us to avoid mistakes, and enables us to stage automatic rollouts.”

That’s exactly what we set out to achieve, and hearing that from one of our customers was extremely gratifying.
