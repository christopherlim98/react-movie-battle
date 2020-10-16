

# react_movie_battle
The demo can be viewed [here](https://vibrant-volhard-03dc6a.netlify.app/ "demo")

Learning to use React, JS, CSS, HTML and APIs

## Learning points
> Most interesting takeaway

Realised that a large part of building a website is basically rendering lists. :smile:

> When would you use a Class Component over a Functional Component?

Use a Class Component (or React Hooks) when the component has state or uses lifecycle methods. Otherwise, we prefer functional components.

> What is the component lifecycle?

There are three stages to the component lifecycle:
1. When the component gets added to the DOM, i.e. mounting.
2. When the component updates its state or receives new data via props, i.e. updating.
3. When the component gets removed from the DOM, i.e. unmounting.

> Minor rant: The ever-illusive key, React's equivalent of that pesky semi-colon

Ever ran into many errors, just because of a missing semi-colon? Well, react's equivalent is adding keys to lists. Always use keys when mapping!

```javascript
 items.map( ({ item, id }) => <li key={id}> {item} </li>

```

In reconciliating state changes and prop updates, React compares the new element tree to the previous element tree. Keys helps to facilitate this process, allowing React to quickly compare across siblings by keeping track of what has been changed.

> The "React Way" of doing things

Use controlled components to handle native HTML items (like form data and input) rather than uncontrolled components. Controlled components handle data in React components, while uncontrolled components handle data in the DOM.

> What is React, really?

React builds on the idea of function invocation. The resulting UI is "merely" a function of props/state/data. Of course, a lot more magic goes behind that.

## Closing thoughts
>What are some stuff that could be worked on?

##### Crawl and build my own movie database
The project uses an API to fetch reviews from TMDB and OMDB. However, as their data is largely second-hand, the data provided is far from complete. For instance, OMDB provides IMDB ratings for selected shows, not all shows, hence some movie ratings simple have the value "CMI". CMI stands for "cannot make it", which is Singapore slang for hopeless.

Cons: Crawling data is time consuming and computationally expensive. Also, I have yet to get written permission.

##### Refactor to use React Hooks
React Hooks is the true magic of React, allowing us to use functions with the added benefits of state and lifecycle methods.


