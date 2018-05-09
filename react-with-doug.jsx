/* Recitation 1 with Doug
 * Assumption: React is basically creating regular Javascript functions that create objects when called.
 * 	- React components are like deterministic functions that return descriptions of the UI
 * A: setState() tells a component that data has changed, are there other ways to change state?
 * A: render describes how the UI looks at any point in time, so render gets called over and over again 
   everytime state changes? How else could render get called?
 * A: How React Flows (in right window)
 *
 * Q: Why use const for all variables in the Facebook docs?
 * Request: Let's discuss the similarities and differences of props and state.
 * Q: What is the purpose of the class constructor?
 * 

 * Receitation 2 with Doug
 * Q: The state of one component will often become the props of a child component.
 	- What can go wrong if a child component irresponsibily changes the state of its parent?

 * A: React DOM compares the element and its children to the previous one, and only applies 
 the DOM updates necessary to bring the DOM to the desired state.
 	- The virtual DOM compares react elements and those elements children. So when we diff the
 	virtual dom with the native one, it's essentially checking all the elements, we wouldnt say
 	it's checking all the components, since elements are the smallest form of react apps.

 * Q: Props are immutable, which lets React do faster reference checks. Why?

 * Q: What are the disadvantages of */ <Clock date={new Date()} />
 /* 	- It looks like we're passing a new date as a prop to the clock component every second.
 		- React docs want to turn this into state. What is the advantage here oppposed to keeping
 		it as a prop?

 * A: The rule of thumb is to make functional components as much as possible. What distribution
 	in your react development is functional and what is class? 

 * Q: Is something still a user defined component if it's just */ <Clock /> /*

 * Q: In class components, we set up a timer whenever they are rendered to the DOM for the first 
   time. (Mounting) We clear the timer everytime the component is removed (unmounting)
   - Why do we have to do lifecycle hooks this way? 

 * Q: Use state to store the data your current page needs in your controller-view. What is the
  controller view in the React context here?

 * A: Understanding 'State updates are merged'


  
