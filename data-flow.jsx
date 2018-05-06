// A component may choose to pass its state down as props to its child components:
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>

// This also works for user-defined components:
<FormattedDate date={this.state.date} />

// The FormattedDate component would receive the date in its props and wouldn’t 
// know whether it came from the Clock’s state, from the Clock’s props, or was 
// typed by hand:
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// (You can pass the state as a props parameter to a child component)
/*
	This is commonly called a “top-down” or “unidirectional” data flow. 
	Any state is always owned by some specific component, and any data 
	or UI derived from that state can only affect components “below” 
	them in the tree.
*/
