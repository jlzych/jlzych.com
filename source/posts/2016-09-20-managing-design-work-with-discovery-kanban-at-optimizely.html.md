---
title: Managing Design work with Discovery Kanban at Optimizely
date: 2016-09-20 20:21 PDT
tags: ["Discovery Kanban", "process", "design"]
---

_Update 3/23/18: I created a [Skillshare class](https://www.skillshare.com/classes/Discovery-Kanban-101-How-to-Integrate-User-Centered-Design-with-Agile/677077315?teacherRef=748023&via=teacher-referral&utm_campaign=teacher-referral&utm_source=ShortUrl&utm_medium=teacher-referral) to teach you how to implement a Discovery process at your organization._

In my [previous article](/2016/07/17/discovery-kanban-at-optimizely/), I described how we transformed our Agile development process at Optimizely to include research and design by implementing our own flavor of Discovery kanban. This process gives designers and researchers space to understand our customer’s problems and explore solutions before we commit to shipping new features. In this article, I’ll go a level deeper to describe all the stages research and design work moves through during the discovery process.

![Updating work on the Discovery kanban board](/images/2016-09-20-managing-design-work-with-discovery-kanban-at-optimizely/1-updating-board.jpeg)
_Updating work on the Discovery kanban board_

## Background

The Discovery kanban board is based on the [double-diamond model of design](http://www.menadrc.org/#!research/c11zh), which visualizes the design process as two connected diamonds. The first diamond represents understanding the problem, and the second diamond represents solving the problem. Diamonds are used to communicate that work alternates between **divergent** phases, in which ideas are broadly explored, and **convergent** phases, in which ideas are filtered and refined. Peter Merholz, a founding partner of UX consulting company Adaptive Path, has a [nice overview of double diamond design](http://www.peterme.com/2013/09/26/the-double-diamond-model-of-product-definition-and-design/).

![Double Diamond design diagram](/images/2016-09-20-managing-design-work-with-discovery-kanban-at-optimizely/2-double-diamond.gif)

_Source: [http://www.menadrc.org/#!research/c11zh](http://www.menadrc.org/#!research/c11zh)_

The diamonds represent different kinds of work, with defined inputs and outputs, so I adapted each diamond into a kanban board. A kanban board is simply a series of stages, represented as columns, that work moves through, with acceptance criteria that dictate when items move into each stage.

The first kanban board is **Problem Understanding**, where we gather information to understand and frame the problem. The second kanban board is **Solution Exploration**, where we take the output of Problem Understanding and solve the specific problem we identified. Together, they make up Optimizely’s Discovery kanban process.

![Overview of Discovery kanban at Optimizely](/images/2016-09-20-managing-design-work-with-discovery-kanban-at-optimizely/3-discovery-system.jpeg)
_Overview of Discovery kanban at Optimizely_

## Problem Understanding

The goal of the Problem Understanding phase is to understand, refine, and frame the problem so it’s concrete and solvable. The input is a problem area to study further, and the output is a deeper understanding of the problem (often in the form of a report or presentation). The output either feeds directly into the Solution Exploration backlog, or it’s general knowledge that benefits the company (e.g. helps us make a strategic decision).

Work on this board moves through 5 columns: _Backlog_, _To Do_, _Researching_, _Synthesizing_, and _Socializing_.

![Problem Understanding kanban board](/images/2016-09-20-managing-design-work-with-discovery-kanban-at-optimizely/4-problem-understanding.jpeg)
_Problem Understanding kanban board_

### Backlog

“Backlog” is just a bucket of problem areas and pain points. It isn’t prioritized, and anyone can put a card up on the board. There’s no promise that we’ll work on it, but it’s at least captured and we can see what people are thinking about.

The cards themselves are typically written in the form of a question to answer, e.g. “What metrics do people want to track?” But sometimes we just write a problem area to study, e.g. “New metrics & metrics builder.”

### To Do

Each week, we take items out of Backlog and move them into “To Do.” We typically prioritize items based on how big of a problem they are for customers (with input from the product vision, roadmap, and company priorities), but this isn’t a strict rule. For example, we may need some data to make a strategic decision, even if it isn’t the “biggest” problem.

After an item has been prioritized, we write up a research plan to answer the question. This includes choosing a research method(s) that’s best suited to answering this question. There’s no prescribed format for the research plan, but at a minimum it specifies what question we’re answering and the research method to use.

The research method could be a qualitative method, such as customer interviews or contextual inquiry, or a quantitative method, such as sending a survey, analyzing server logs, or querying the data warehouse. For some problems we use a combination of different methods.

### Researching

Once a research plan has been agreed upon, work moves into the “Researching” stage. This means we execute the research plan — customer interviews are scheduled, a survey is sent out, analytics are analyzed, and so on. This stage is **divergent** — we go broad to gather as much data related to the problem as we can.

### Synthesizing

After gathering data in the Researching stage, work moves into the “Synthesizing” stage. We analyze the data we’ve gathered for insights and, hopefully, a deeper understanding of the problem. This stage is **convergent** — we are filtering and focusing the data into concrete takeaways and problems to be solved.

### Socializing

Once the research has been synthesized, it moves into the “Socializing” phase. The bulk of the work is done, but the outcome is being shared with the team or company. This takes the form of meetings, a presentation, a written report, opportunity assessment, or whatever format is appropriate for the problem being studied. At the very least, a link to the research plan and the data captured is shared with the team.

Sometimes we learn that a problem is especially complicated and the research plan wasn’t sufficient to understand it. If so, we may do more research (if this problem is important enough), or just make the best decision we can based on the data we do have.

After studying a particular problem, the work either ends there (in the case of things like personas or data to inform product strategy), or it turns into a problem for design to solve. In the latter case, work moves into the Solution Exploration backlog.

## Solution Exploration

Once we understand the problem, we can start designing solutions to it. We track this work on the Solution Exploration board (a.k.a. the second diamond in double diamond design). A problem may have UX challenges to solve, technical challenges to solve (i.e. is this feasible to build?), or both. The output of the Solution Exploration phase is a finished solution to build. The solution is either a complete UI, such as mockups or a prototype, or a technical solution, such as a technical design doc or a technical prototype, which can be implemented in a production environment.

In this phase, work also moves through 5 columns: _Backlog_, _To Do_, _Exploring & Thinking_, _Iterating & Deciding_, and _Ready to be Built_.

![Solution Exploration kanban board](/images/2016-09-20-managing-design-work-with-discovery-kanban-at-optimizely/5-solutions.jpeg)
_Solution Exploration kanban board_

### Backlog

Just like in Problem Understanding, work starts life in the “Backlog.” This is a big pool of problems to solve, and anyone can add items to it. But once again, just because it’s in the backlog doesn’t mean we’ll work on it — it still needs to be prioritized.

### To Do

Each week we prioritize items in the Backlog and move them into “To Do.” This means we have a well-formed problem, informed by data (typically generated in Problem Understanding, but may come from other sources), that the team will design a solution to. For most problems, we formally write out a what the problem is, why it’s worth solving, who we’re solving it for, and the scope. ([View the template on Google Drive](https://docs.google.com/document/d/161XX2caxCuMczYvcboWxgfafRUUnvB63mQKmOlqxQlE/edit?usp=sharing)).

Writing out the problem before jumping into solutions ensures the team is aligned on what we’re solving, which prevents wasted work and changing scope after a project begins. It also surfaces assumptions or incomplete data we may have, which would mean we need to go back to Problem Understanding to gather more data.

### Exploring & Thinking

After a problem definition has been written, work moves into the “Exploring & Thinking” stage. This means we’re exploring solutions to the problem. This could be sketching, prototyping, building technical proof-of-concepts, researching potential libraries or frameworks, writing technical design docs, or whatever method is best for exploring possible solutions. This stage is **divergent** — a broad range of possible solutions are being explored, but we’re not filtering or refining any particular solution yet.

### Iterating & Deciding

Once a broad range of solutions have been explored, we move into the “Iterating & Deciding” stage. This means potential solutions are being evaluated and refined. Tradeoffs and approaches are being discussed with relevant groups. This stage is **convergent** — ideas are being refined into a single, finished solution.

There isn’t strict criteria for whether an item is in “Exploring & Thinking” or “Testing & Iterating.” The creative process is somewhat chaotic and people often switch between an “exploring” and “refining” mindset throughout a project. But there’s typically an inflection point at which we’re doing more refining than exploring. The exact column work is in is up to the person doing it.

Having 2 columns may sound unnecessary, but it’s useful for two reasons. First, it helps communicate where in the creative process work is (especially early stage vs. late stage). This helps designers, engineers, and PMs have better discussions about the solutions being explored. Second, it encourages people to separate divergent thinking from convergent thinking. It’s easy to just go with the first idea, but that’s rarely the best solution. By encouraging exploration, we increase the odds that we’ll choose the best solution.

### Ready to be Built

After we’ve iterated enough we’re left with one finished solution that’s ready to be built and shipped to customers. A “finished solution” is one for which all edge cases have been thought through, it’s been vetted by relevant parties, and there are no major questions open that would slow down development. Finished solutions are in the form of mockups or a prototype, if a UX solution, or a technical design doc or proof-of-concept, if a technical feasibility solution. The finished solution then moves into engineering’s backlog, where it gets prioritized against all the other potential work to be done.

---

Together, the Problem Understanding and Solution Exploration kanban boards make up Discovery kanban. The definition of each column may sound prescriptive, but it’s actually a suggested process to follow. Work doesn’t always move linearly through each column, and we aren’t sticklers about meeting exact acceptance criteria to move work forward. The important thing is that we’re working together to solve our customer’s biggest problems, ultimately increasing customer value and business value.

Since implementing this process we’ve gotten better at prioritizing the biggest customer problems to understand, have space to explore solutions to those problems, and are [regularly shipping work to customers](https://community.optimizely.com/t5/Product-What-s-New/bg-p/blog-new-product). No process is perfect, but we’re always trying to improve how we work in an effort to consistently ship great products to our customers.

_[This post originally appeared on the Design @ Optimizely blog](https://medium.com/design-optimizely/managing-design-work-with-discovery-kanban-at-optimizely-9918e7959be5)_
