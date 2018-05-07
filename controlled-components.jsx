// In HTML form elements maintain their own state and update based on user input
// In React, changable state is kept in the state prop and is updated with setState()

// We can combine the two and make a React component that renders a form but also controls what happens in that form based on user input.

// Controlled component: an input form element whose value is controlled by React
class NameForm extends React.Component {
  constructor(props) {
  	// enable this.props and this.state
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
      	  {/* this.state.value constantly updates with onChange */}
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// With controlled components, every state mutation will have a event handler.
handleChange(event) {
	this.setState({value: event.target.value.toUpperCase()});
}