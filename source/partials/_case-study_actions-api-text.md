Gladly just inked a contract for our software to power all of Ulta Beauty's contact centers — over 1,000 agents in all. At the time, it was the second biggest deal in the company's history. We cinched the deal on the promise that our product would get them to their vision of a "single pane of glass," meaning agents never have to leave Gladly to help customers. Cancelling and refunding orders, adding loyalty points, update shipping address, and more, could all be done within Gladly's UI.

Currently, agents had a dozen different systems to jump between to complete a customer request (we learned this while shadowing agents during the sales process). They used a mix of off-the-shelf software (like IBM Sterling) and homegrown solutions, stitched together by their IT team, which slowed down agents and hurt customer satisfaction scores (commonly called CSAT). By providing all this functionality within Gladly – and with a consumer-grade user experience to boot – agent productivity would increase, as would customer satisfaction.

There was just one problem: we hadn't built it yet. And we didn't know how.

[![Screenshot of final agent experience for cancelling and refunding orders within Gladly](/images/case-studies/gladly-actions-api/1-final-cancel-markedup.png)](/images/case-studies/gladly-actions-api/1-final-cancel-markedup.png)
*The main screen agents use when helping customers, showing the full timeline of conversations with that customer in the middle, and information about the customer on the left. We added "Cancel & Refund" and "Refund" buttons to the order card, which agents can click to issue a refund and cancel the order, all without leaving Gladly. Behind those buttons lays a lot of technical wizardry we had to figure out.*

## The Challenge

Making agents more efficient by letting them perform common tasks with Gladly wasn't a new idea. We had been hearing about it for months from other prospects and current customers. Ulta was just the first deal that closed that put it in the contract.

![Early mockups and technical proposal we showed Ulta](/images/case-studies/gladly-actions-api/2-sales-mock.png)
*Early mockups and technical proposal we showed Ulta*

We closed Ulta on the strength of a polished mockup of the agent's experience, and a hand-wave-y technical diagram (pictured above). We knew it was technically possible, but we didn't know specifically how. The challenge was to build a solution that:

- Worked with any system our prospects and customers threw at us. Like Ulta, they used a mix of off-the-shelf software like Shopify and IBM Sterling, and homegrown systems
- Wouldn't require our customers' IT teams months or even weeks of building piping to integrate with us.
- Was a high-quality agent experience that matched Gladly's UX, so that we didn't slow down agents and they didn't have to know or care which systems it was connected to on the backend. It just worked.

The agent experience was easy. It's just buttons and forms. The hard part was what happens when those buttons are clicked and the form was submitted? How would we know what data to collect from agents, and where to send it once submitted? It would be easy to build one-off solutions that required little to no work on our customer's end, but across all of our target customers there were endless combinations of systems to build against, making that option intractable.

## Three Potential Paths

To make this agent experience a reality, the PM, engineering lead, and myself got in a room to review the mockup and whiteboard potential ways of building it. We came up with 3 that were viable (and 1 that was technically viable, but didn't meet our goal of a great agent UX):

- A UI builder in our admin page. This would let admins build forms to collect data from agents, and provide a URL to submit the form to.
- We already had an API called the "Lookup API" that customers used to lookup customer data, and pipe it into Gladly, such as order history and loyalty points. We could extend that by adding an `actions` JSON blob to the response, which would let developers declaratively attach "actions" to their customer info, specify what data they needed, and where to send it when agents submitted the form. This would also work with out of the box solutions, like Shopify.
- Similar to the above, we could extend the Lookup API with a custom Javascript UI library that would let developers build a UI inside Gladly. We'd still control the look-and-feel of the UI, but they could build just about any functionality they wanted.
- Give developers an iFrame to put any UI into. We knew this was technically viable and would work with any system, but we were strongly opposed to it because the agent experience would be terrible. That being said, at least one customer said, "Just give me an iFrame," so we needed to consider it.

I did lo-fi mock-ups of each of these options to ensure the team was aligned on what each of them were, and also to show customers to aid us in research.

[![Lo-fi mockups of the 3 paths we were considering](/images/case-studies/gladly-actions-api/3-lo-fi-3-paths.jpg)](/images/case-studies/gladly-actions-api/3-lo-fi-3-paths.jpg)
*Lo-fi mockups of the 3 paths we were considering*

So which was best? Each had tradeoffs, both for us and customers. Would developers want to build UIs within Gladly? Would they want to learn how to build custom UIs with our JS library? Would an `actions` JSON blob be expressive enough to perform any action customers threw at us?

## More Customer Discovery

We reviewed these approaches with developers at our current customers who had already built integrations using the Lookup API. After talking to 3 customers (we wanted to talk to more but finding representative developers who were interested in this feature on a short timeframe was difficult), a pattern emerged:

- Admin UI builder was cumbersome to use. They write code for a living, and don't want to build UIs in an admin interface. Plus, they'd still have to build backend systems to receive the response from any UI they built in Gladly.
- Similar problem with the custom JS UI library – they'd have to learn a new arbitrary syntax to build a UI. And it pushed our customers, especially the developers, to be designers, which they didn't want to do, and risked degrading the agent experience.
- iFrames sucked for everyone. They all agreed it was painful to build and maintain, and previous iFrame solutions they had used would break. Cue sigh of relief from us.

The winner, then, was adding an `actions` JSON blob to the Lookup API to declaratively create a UI out of a limited palette of building blocks. This was also great for us because it was less to design and build – no complicated admin UI to figure out, and no JS UI library to build.

## Pushing the UX forward

Up to this point, I had stayed lo-fi on purpose. We weren't sure how we were going to build it, and the architecture would impact the experience for both developers and agents. Going hi-fi too early would have been a waste of effort. I would have been polishing details that were likely to be thrown out. Plus, staying lo-fi helps us stay nimble and quickly throw out options that aren't working without a second thought. ([Read more about my take on staying lo-fi](/2020/04/07/the-power-of-low-fidelity/)).

Now that the technical piece was sorted out, I could push the UX into mid-fi. My whole approach to this project was to have the UX take a step, then engineering, then UX, then engineering, each time moving into higher fidelity.

[![Screenshot of my Figma file of mid-fi mockups](/images/case-studies/gladly-actions-api/4-mid-fi-with-errors.jpg)](/images/case-studies/gladly-actions-api/4-mid-fi-with-errors.jpg)
*Screenshot of my Figma file of mid-fi mockups*

## Executive Input

Now that we were confident in our path, we wanted to get final input and sign off from our executive team before going full-steam ahead on development. Plus, Ulta wanted specs to build against, so we were flying to them to review the Actions API, collaborate with their IT team on how they'd build their "single pane of glass," and build the personal relationships to make our partnership a success. Whatever we showed Ulta we needed to show our executive team first.

The executive team's feedback was very positive – the project was on track, would make Ulta successful, was general enough to work for other customers, and was a good experience for both agents and developers. Just one piece was lacking: **I hadn't explored enough options for the agent experience**.

I showed agents completing actions through a modal flow, but the CEO pointed out that this would stop agents from being able to see information about the customer and the conversation history, which may include details necessary to complete the action (like the reason they're cancelling an order, for example).

I got so caught up in the technical constraints and staying in lock-step with engineers that I didn't spend enough time exploring options for the agent UX. This piece felt "simple", so I focused on the hard bits. But I didn't come back to re-visit the initial decision we had made in the sales mock. I quickly made a mockup of actions in the context of the bottom panel, where agents write emails and notes, to show Ulta. Lesson learned for the future: make sure to explore a wide variety of options for every piece of the experience.

## Visiting Ulta

We flew out to Chicago the following week, and the meeting was a resounding success. The Ulta team was happy with the API we had fleshed out since the sales process. We whiteboarded hwo they would build against, and the only road blocks were on their side. Their technology stack was a miasma of various technology vendors and homegrown systems, most of which lacked APIs to integrate with us. Thankfully that wasn't a knock against us – it was a knock against their other technology vendors. They would have to work through that on their side, and with their leadership team.

## Finalizing the agent experience

Upon returning from the Ulta meeting I passed the work off to another designer. There were a few reasons for this:

- He's the designer on Team Agent, which owns the agent experience. It was always my plan to get him involved.
- My primary responsibility is managing and leading the team, so I needed the help of another designer to get it over the finish line. I wanted to shape the work and guide it, but finalizing every UI state and working with engineers on all the final details is best handled by a member of my team.

I filled him in on all the research and the feedback from the CEO, and he explored more ways of how agents could perform actions.

[![Darrell's broad explorations of the agent experience](/images/case-studies/gladly-actions-api/5-darrells-explorations.jpg)](/images/case-studies/gladly-actions-api/5-darrells-explorations.jpg)
*Darrell's broad explorations of the agent experience*

He did an amazing job of exploring a wide variety of options (something I expect from all of my designers, making it even more egregious that I failed to do so myself) in a short period of time. We reviewed them, along with my boss (VP of Product and Design), and agreed on a right panel approach. However, this view is very important to the CEO, and he believed all agent work should happen at the bottom panel.

Normally we would have done usability testing to get more data on how agents would use this feature, but the Ulta go-live date was barely 2 months away, with the holidays in the middle, so engineering had to start building immediately.

We decided to go with the CEO's preferred option, but built it in a way that gave us the option to move it to a side panel in the future.

The designer quickly polished up the designs, while engineering set out building everything we promised Ulta. They hustled to get it done by the date we agreed to with Ulta, which showed amazing dedication and resiliance from the engineers.

## Launch

Engineering hustled hard to hit our agreed upon go-live date with Ulta, and then... Ulta wasn't ready in time. In my experience this isn't uncommon when building product for enterprise customers, but can be disheartening.

In this case, though, we closed another customer on the strength of the upcoming Actions API, so they were champing at the bit when we shipped.

[![Screenshot of final agent experience for cancelling and refunding orders within Gladly](/images/case-studies/gladly-actions-api/1-final-cancel-markedup.png)](/images/case-studies/gladly-actions-api/1-final-cancel-markedup.png)
*The final agent experience we shipped*

We turned it on for them and wish I could say it was an immediate hit, but... it wasn't. It got some usage, but not a lot.

Why? We did weekly check-in calls with the customer to get to the bottom of it, in which we learned 2 things:

- There were a couple of small bugs that made the experience confusing for agents (like orders with 0 dollars that could still be "refunded"), which made them not trust the feature.
- The company had a previous policy that agents weren't allowed to issue refunds, so they didn't think they were allowed to use the feature. This was further backed up when we looked at FullStory and saw people escalating refunds to their manager. Good for them for following the rules! But when our point-of-contact told us that, they realized they needed to re-train their agents to use this feature.

After fixing the bugs and doing re-training, usage didn't immediately spike, but it did grow steadily week over week. Behavior is slow to change, even with training, and especially when the actions are as serious as cancelling orders and issuing refunds (actions that agents want to make sure they're doing properly).

Even so, the first customer loved the feature, and agents had positive feedback once they got used to using it. I wish I had numbers on the time saved or increase in CSAT, but sadly I was laid off due to COVID before we had enough data to get those numbers.

After the feature launched, it became the darling of the sales team. Prospects loved making agents more efficient by not having to leave Gladly, and it helped close several customers while I was still there.

## Lessons learned

- Stay lo-fi
- Work in lock-step with engineering. Don't let the UX get too far ahead of what's technically possible. The UX should be pushing things forward, but regularly reviewing with engineering to ask, "How might we build this? What other options do you see?" Then reacting to their feedback, and making their options real.
- Always explore a variety of options! "Look for the edges of the solution space," I always say, meaning, go broad exploring many options before going deep on any one of them. I didn't explore enough and got complacent with the initial sales mock we showed customers
- Enterprise features don't get adopted immediately. People have busy work lives, they have certain habits they've built, and have been trained to do and not do certain things. A feature not getting adopted doesn't mean it isn't valuable or usable, it may mean there's organizational policies that need to change. Always stay close to customers to understand these things. Data you can measure on your side doesn't tell the whole story.

All-in-all this was a fun and challenging project that customers and prospects love, and was a great building block to new cool functionality.
