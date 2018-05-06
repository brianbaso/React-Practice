// Let's change a functional component to a class-defined component.

// Functional components
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

// Step 1: Create an ES6 class that extends 'React.component'
class Clock extends React.Component {
	// Step 2: Add a single empty method called render
	render() {
		// Step 3: move the body of the function inside render
		// Step 4: replace all 'props' with 'this.props' inside render
		// Step 5: delete remaining empty function declaration
		return (
			<div>
		        <h1>Hello, world!</h1>
		        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      		</div>
			);
	}
}
// Now that we have clock defined as a class rather than a function,
// we can use additional features such as local state and lifecycle hooks.

// ******
// OK, now we need to change 'date' from props to state!
// Step 1: change 'this.props.date' to 'this.state.date' inside the render method
class Clock extends React.Component {
	render () {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
			);
	}
}

// Step 2: now we have to add a class constructor that assigns the initial
// this.state
class Clock extends React.Component {
	// class constructor (confusing right now)
	// note how we pass props to the base constructor, class components
	// should always call the base constructor with props 
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}

	render () {
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
			</div>
			);
	}
}

// Step 3: remove the date prop from the clock element
ReactDOM.render(<Clock />, document.getElementById('root'));

// *****
// The result of our new class defined component that has transformed the
// props to state
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