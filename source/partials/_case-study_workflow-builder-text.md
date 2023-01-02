<aside class="callout">
  <h4>Project at-a-glance</h4>

  <ul>
    <li>My role: Shaping and directing the work as the Head of Product Design (at start), then the sole Product Designer (for GA launch).
    <li>Company: LaunchDarkly, the #1 platform for managing feature flags
    <li>Target customer: Developers & release managers
    <li>Team: I worked with the leadership team (Co-founder/CTO, SVP Eng/Product) to shape the solution, then a product manager, product designer, engineering manager, and 5 engineers to build and release from early access program (EAP) through a full launch to all Enterprise customers.
    <li>Timeline: Aug. 2021 to Jan. 2022 (launch to all Enterprise customers), with an early access program starting in Nov. 2021 (EAP start)
    <li>Impact
    <ul>
      <li>Steady adoption from EAP through GA, resulting in some of our biggest accounts relying on it for feature launches.
      <li>Customer quote: “Feature Workflows saves my team time, helps us to avoid mistakes, and enables us to stage automatic rollouts.” —James Pipe, Head of Product at DroneDeploy
      <li>Key part of the demo to prospects
    </ul>
    <li>Skills used in this project
      <ul>
        <li>Led a workshop with product leadership to shape the project by translating the co-founders vision into whiteboarded sketches and lo-fi user flows
        <li>Directed the work of a product designer
        <li>Led customer interviews during EAP
        <li>Visual design and polish of hi-fidelity screens
      </ul>
  </ul>
</aside>

It’s 5am. Your alarm’s going off. You’re bleary-eyed and tired but have to log into LaunchDarkly to rollout your new feature to 5% of your audience. Then you’ll have to do that again the next day to another 5%. And again the next day. And so on until it’s rolled out to 100% of your users.

These are the hoops we made our customers (and ourselves) jump through every time they launched a new feature. It was a painful, manual, and occasionally error-prone process. It was an obvious pain point that we should solve, and one that no competitor had a solution to, either.

Our solution was the **Workflow Builder**: a visual way to automate feature launches in LaunchDarkly.

![Screenshot of the finished workflow builder](/images/case-studies/workflow-builder/1-finished-wfb.png)
_Screenshot of the finished workflow builder_

## How’d we get to the workflow builder?

The pain I described above was well-known to the co-founder — both from experiencing it firsthand, and from talking to customers. As such, he had already had a vision in mind: most software launches are a repeatable process, so we should let customers automate that in LaunchDarkly. Not only would it save time, toil, and prevent errors, but it would be a competitive differentiator to further cement our place as the market leader.

To turn this vision into reality, myself and the PM ran a day-long **workshop** with the co-founder and VP of Engineering & Product.

The first half of the day was **opportunity framing**: what pain points do customers currently have, what are their release processes, and how have other products solved similar challenges (we didn’t look at direct competitors, since they didn’t have anything like this, but rather automation products like Zapier).

The second half of the day was **solution exploration**: whiteboarding all the pieces of the finished solution. We started high-level going through all the screens we’ll need and the places in the product that we’ll need to update, then dove into fleshing those out with more sketches.

Some of the key challenges we had to solve were:

- Release processes all have similar contours, but the specifics are unique for every organization. Building common launches into LaunchDarkly (like a progressive rollout, or alpha → beta → GA launches) would make for a really easy-to-use feature, but it wouldn’t be flexible enough to do it the exact way each customer does it. So our main challenge was: how do we create a solution that’s flexible enough to support any process, while not being overwhelming or confusing to set up?
- Where do you access this feature? The main feature flag page is already bursting at the seams, so we needed to balance discoverability with not disrupting existing core user flows.
- When a workflow is running, how would a user know that when viewing a feature flag? This was especially important because *teams* build software, not individuals, so if person A starts a workflow, person B may not be aware of that when making changes to the flag (which could lead to errors, like the wrong end users seeing a feature still in development).
- How do I manage workflows? Where can I see all that exist, stop them, modify them, etc.? Can I re-use them? If so, how?

The bulk of the afternoon was spent whiteboarding solutions to these challenges, and poking holes in each other’s ideas to ensure we were thinking through the problems from every angle. By the end of the day we had a sketch of the overall system, the primary screens that would need to be built, and some foundational product and design decisions that underlie the whole system and would guide the team as they fleshed out the details.

**Foundational product and design decisions**

- **Workflows should be visualized from top to bottom**: Rationale: top-to-bottom is common in other workflow products (like Zapier), and visually represents the idea of a timeline well. It allows space for long, complex workflows (like some of our customers have), while making it easy to build.
- **Workflows should be built one step at a time**: some customers have have long, complex release processes, so to make that manageable they should add a step at a time, and we’ll provide relevant, valid options rather than presenting everything you could do with a flag and asking them to sort through the options.
- **Use intelligent default values, and make them easy to change**: Using intelligent defaults (like filling in the first step to start “Now” and having a blank action ready to be filled so that people feel a sense of progress and aren’t facing down a blank page), will guide people through the process, and make it less overwhelming and daunting.
- **Each step of the workflow should be directly manipulable**: Editing steps directly inline, rather than opening modals or drawers, will help people get in a flow of creating a workflow, and be less UI to learn.
- **Stages should be implicit and optional**: The feature has a concept called “stages” that group sets of actions together. For example, customers frequently do make multiple changes to a flag at one time, but think of them as one “set” of changes. We decided to support this by grouping sets of changes into “stages”, but we decided that we should do this implicitly and make it optional for users to set this themselves, in order to simplify the creation of workflows.
- **Visualize workflows as a summarized timeline**: We want to show workflows in various places in the product, so a summarized timeline view will give us a compact, visual component to use in various places.

<aside class="callout callout-left">
  <h4>Sidebar: A deep-dive into workflow builder read-only view</h4>

  <p>An enhancement we added for GA was the ability to view in-progress and completed workflows in a read-only view. This view needed to:</p>

  <ul>
    <li>Show the steps of the workflow without letting people edit them
    <li>Make it clear what had already ran, what was currently running, and what had yet to run
  </ul>

  <p>The team and I discussed three options of increasing complexity and effort: crawl (just show the workflow builder with disabled fields, no distinguishing completed steps from incomplete. Least effort), walk (show which stages had completed, but not individual steps. Medium effort), and run (use iconography and color to distinguish completed steps and stages from incomplete ones).</p>

  <p>The next day I shared quick-and-dirty mockups with the team. The purpose of these mocks was to more concretely discuss level of effort, appetite, and user experience tradeoffs. They were not intended as finished mocks to build, hence I prioritized speed over quality.</p>

  <a href="/images/case-studies/workflow-builder/wfb-read-only-artboard1.png">
    <img src="/images/case-studies/workflow-builder/wfb-read-only-artboard1.png">
  </a>
</aside>
