// In HTML text area defines its text by its children
<textarea>
	This is lame!
</textarea>

// In JSX, text area uses a value attribute (sweet)

// Class component (EssayForm)
class EssayForm extends React.Component {
  constructor(props) {
  	// Enable this.state and this.props
    super(props);
    // initalize the state of the essay form :)
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    // allow handleChange and handleSubmit to be used outside of scope
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // run this every time theres a state mutation (most likely from user input)
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
      {/* this.state.value constantly updates with onChange */}
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}