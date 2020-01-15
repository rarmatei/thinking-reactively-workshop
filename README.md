# Thinking Reactively with RxJS - Egghead.io Workshop

## Pre-requisites

#### Software

- Verify your computer has the following installed:

  - `git` (verify by running `git --version`)
  - `node` v8.9.3 or greater (verify by running `node --version`)
  - `npm` (verify by running `npm --version`)

- Clone this repo and `cd` into it
- Run `npm install`
- Test if you can run the app: `npm start`
  - You should see a browser window open at `http://localhost:3000`
  - And after a few moments, an app with two tabs and two buttons

#### Helpful knowledge

**The main pre-requisite for this course is to have some experience with RxJS and its most popular operators.**
All of the below operators and theory will be covered in the course as well, but given that they are not the focus of what we want to teach, we will not spend too much time on them. The more time you spend on the below, the easier it will be to solidify everything during the workshop.

##### Intro for beginners:

[Introduction to Reactive Programming](https://egghead.io/courses/introduction-to-reactive-programming)

##### Operators

[RxJS Beyond the Basics - Operators in Depth](https://egghead.io/courses/rxjs-beyond-the-basics-operators-in-depth)
Highly recommended, it explains `scan`, `combineLatest`, `merge`, `startWith` and a few other operators we will use in the course

---

Recommended for understanding the `shareReplay(1)` usage in the workshop and also `Subjects`:
https://egghead.io/courses/rxjs-subjects-and-multicasting-operators

---

Check out the [OPERATORS.md](OPERATORS.md) for a complete list of operators we'll use in the course, along with links to resources and sandbox Stackblitz environments where you can play around with them.

##### Promises

[Understanding the ES6 Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

##### Bonus / Further learning

All around incredibly good course around higher order observables and different merging strategies in RxJS:
[Use Higher Order Observables in RxJS Effectively](https://egghead.io/courses/use-higher-order-observables-in-rxjs-effectively)

## During the workshop

The only files we'll use/work on during the workshop are below:

```
root
└── solutions-bonus-exercises
    ├── 01-understanding-the-problem
    ├── 02-build-a-counter
    └── ..etc.
└── src
    ├── lesson-code
   	    ├── TaskProgressService.js <-- MAIN WORK AREA
	    └── EventCombo.js
        └── Extensions.js
└── README.md
```

We'll mainly work in `TaskProgressService.js`

We'll go through the different stages in the workshop.

**If you ever get stuck,** the solutions to each stage are in the `solution-bonus-exercises` folder.

**If you finish a stage early,** you can check out the `solutions-bonus-exercises/stage-we-are-at/EXTRA.md` file for some extra questions/work.

**If you join late,** you can, at any point, type `git checkout stage-X`, where `X` is the current stage we're at, and it will bring you up to date with all the latest changes we've been making.

After the workshop, you can see a the complete, built project, by typing `git checkout final-solution`.

If you want to practice a specific operator more, check out the `OPERATORS.md` file for links to Stackblitz sandboxes for that specific operator.

## After the workshop

- Finish the app we started in class
- Complete all the extra assignments for each stage in the `solutions-bonus-exercises` folder
- Think of a different way to implement the following requirements from the course:
  - **show delayed**
  - **hide delayed**
  - **key combo**
- If you haven't yet, go through all the pre-requisites above and read more about the operators/mechanics we discussed in the course
