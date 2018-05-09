// Class based component
class Reservation extends React.Component {
  // Construct this.state and this.props
  constructor(props) {
    super(props);
    this.state = {
      // initial values
      isGoing: true,
      numberOfGuests: 2
    };
    // allow handleInputChange to be used outside of scope
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    // is target.type equal to checkbox? 
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    var partialState = {};
    // var partialState = {
    //   name: value
    // };
    partialState[name] = value;
    this.setState(partialState);
  }

  render() {
    return (
      <form>

        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>

        <br />
        <label>

          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>

      </form>
    );
  }
}