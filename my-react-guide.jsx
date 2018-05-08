// ***************************************
// |		      WHY JSX?				 |
// |									 |
// ***************************************
/*
	React knows that rendering logic and UI logic work close together: 
	how events are handled, how the state changes over time, and how the 
	data is prepared for display. JSX uses components that cover all this 
	in one file.

	After compilation, JSX expressions become regular JavaScript function 
	calls and evaluate to JavaScript objects.
*/

// ***************************************
// |		    JSX COMPILED			 |
// |									 |
// ***************************************
// Babel compiles JSX down to React.createElement() calls.
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// Compiles to...
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
// Simplified version
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

// ***************************************
// |		    REACT ELEMENTS			 |
// |									 |
// ***************************************
/*
	React elements are the smallest building block of react apps.
	Components are made of elements.

	React elements are immutable. Once you create an element, you 
	can’t change its children or attributes. An element is like a 
	single frame in a movie: it represents the UI at a certain point 
	in time.
*/

// ***************************************
// |		   REACT COMPONENTS		     |
// |									 |
// ***************************************
/*
	Components let you split the UI into independent, reusable pieces, 
	and think about each piece in isolation.

	Conceptually, components are like JavaScript functions. They accept 
	arbitrary inputs (called “props”) and return React elements describing 
	what should appear on the screen.

	**********	  ***************    ************
	|		 |	  |		   		|    |			|
	| props  | => |	components  | => | elements |
	|		 |    |	       		|    |			|
	**********	  ***************    ************
*/

// ***************************************
// |		 FUNCTIONAL VS STATE		 |
// |			 COMPONENTS				 |
// ***************************************
/*
	Use stateless functions (functional components) whenever possible. The common times
	you will be required to use a class component however are:
		- The component needs to maintain state
		- The component is re-rendering too much and you need to use shouldComponentUpdate
		- Container components (Haven't learned about this yet)

	Note: React now has a PureComponent class that implements shouldComponentUpdate by default.

	Converting a functional component to class:
		1. Create a ES6 class with the same name that extends React.Component.
		2. Add a single empty method to it called render()
		3. Move the body of the function into render()
		4. Replace props with this.props inside render()
		5. Delete the remaining empty function declaration.
*/


// ***************************************
// |		 EXTRACTING COMPONENTS		 |
// |									 |
// ***************************************
// When a component starts to get complex, we can split it up into smaller components.
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
// Extract the avatar component and turn it into its own functional component:
// Changing "author" to "user" so we can reuse Avatar outside of the context of comments.
function Avatar(props) {
	return (
	  <img 
	    src={props.user.avatarUrl}
        alt={props.user.name}
        />;
     );
}

// Now let's refactor using a user-defined component
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">

        <Avatar user={props.author} />

        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

// Now let's go a step deeper: How about we extract a UserInfo component and put
// our new Avatar user-defined component inside it?
function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">
			  {props.user.name}
			</div>
		</div>
		);
}

// Now let's refactor this again:
function Comment(props) {
  return (
    <div className="Comment">
     {/* Wow, what a beautiful user-defined component refactor! 😍*/}
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

// ***************************************
// |		  NOTES ON PROPS	 		 |
// |									 |
// ***************************************
/*
	- Use props to pass data & event handlers down to your child components.
	- Both functional and class components cannot modify their props. Props are read only!
	- Props are owned by parents.

*/


// ***************************************
// |		  NOTES ON STATE	 		 |
// |									 |
// ***************************************
/*
	- Only class components can have state.
	- State is used for internal communication inside a component.
	- State is private and fully controlled by the component.
	- State is an object owned by the component when it is declared.
	- Use state to store the data your current page needs in your controller-view.
	- You cannot modify state directly, you must use setState().
	- The only place you can assign this.state is in the constructor.
	-
*/

// Let's try using state to make the updating of a clock an implementaion detail in the 
// clock component. 
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
// We should not have to include date={new Date()} in our clock component.
// So lets move the date from props to state in three steps:

// 1. Replace this.props.date with this.state.date in render()
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>

// 2. Add a class constuctor that initalizes state.
constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

// 3. Remove the date prop from the previous user-defined component.
// Now our clock component looks like the following:
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

// ***************************************
// |		      LIFECYCLE 	 		 |
// |     (FOR CLASS COMPONENTS ONLY)	 |
// ***************************************
/*
	React component lifecycle events generally fall into three categories:
		1. Initialization
		2. State or prop updates
		3. Destruction

	These events will help manage state, props, and rendered output.
*/
// An example of a lifecycle implementation with five steps:
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  // STEP 3: Once the clock appears on the DOM, a timer in the browser starts which calls
  // tick() every second.
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // STEP 5: If Clock gets removed from the DOM, we clear the timer in the browser.
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // STEP 4: tick() calls setState with an object that holds the currentm updated time. 
  // React knows to re-render anytime state is changed.
  tick() {
    this.setState({
      date: new Date()
    });
  }

// STEP 2: React calls render to figure out what the UI should look like. Shortly after,
// react updates the DOM to match Clock's render output.
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
    {/* STEP 4.5: When we re-render, this.state.date will be updated to the current time. */}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// STEP 1: Render calls the Clock constructor, which initializes state with the current date.
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);



// ***************************************
// |		   PROPS VS STATE	 		 |
// |									 |
// ***************************************
// When state is passed out of its component's scope, it's referred to as prop.

// The state of one component will often become the props of a child component.
<MyChild name={this.state.childsName} />

// The parents state value of childsName will now become the child's this.props.name:
// Since props are read only, the child will not be able to change the name!
// If we want to change the name, it's better practice to just let the parent change its
// internal state.
this.setState({ childsName: 'Benny' });

// So what if the child needs to change its name prop? This can be possible with
// child events or parent callbacks.

// The child might expose an event called, for example, onNameChanged. The parent would then 
// subscribe to the event by passing a callback handler.
<MyChild name={this.state.childsName} onNameChanged={this.handleName} />

// The child would pass its requested new name as an argument to the event callback by calling, 
// e.g., this.props.onNameChanged('New name'), and the parent would use the name in the event 
// handler to update its state.
handleName: function(newName) {
   this.setState({ childsName: newName });
}


