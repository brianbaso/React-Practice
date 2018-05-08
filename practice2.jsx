// An attempt to create an "is prime number" react component

// create a functional component that determines if prime number
function PrimeVerdict(props) {

  var i, isPrime = true;

  if (props.number < 2 || props.number != Math.round(n))
    return <h1>Not a prime number!</h1>;

  for (i = 2; i <= Math.sqrt(props.number); i++) {
    if (props.number % i == 0) {
      isPrime = false;
    }
  }
  
  return isPrime ? <h1>Is Prime Number!</h1> : <h1>Not a prime number!!</h1>;
}

class PrimeChecker extends React.Component {
  constructor(props) {
    // enable this.state and this.props
    super(props);
    // allow handleChange to be used outside scope
    this.handleChange = this.handleChange.bind(this);
    // initalize number to empty string
    this.state = {userInput: ''};
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  render() {
    const userInput = this.state.userInput;
    return (
      <fieldset>
        <legend>Enter number:</legend>
        <input value={userInput} onChange={this.handleChange} />

        <PrimeVerdict number={parseFloat(userInput)} />
      </fieldset>
      );
  }
}

ReactDOM.render(<PrimeChecker />,
  document.getElementById('root'));

