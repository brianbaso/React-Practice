// In HTML, <select> creates a dropdown list. React modifies this by giving the select tag a value attribute!
// In the constructor function, we would initalize state to the selected value
class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};
	}
}

// Now we have to create a handler function for anytime the state changes
function handleChange(event) {
	this.setState({value: event.target.value});
}

// Now, in the render method, we will call handleChange whenever the state is mutated
<select value={this.state.value} onChange={this.handleChange}>
