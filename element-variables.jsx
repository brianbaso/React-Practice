// You can use variables to store elements. This can help you conditionally render a 
// part of the component while the rest of the output doesn’t change.

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

/*
	In the example below, we will create a stateful component called LoginControl.

	It will render either <LoginButton /> or <LogoutButton /> depending on its current 
	state. It will also render a <Greeting /> from the previous example:
*/

// This is amazing
class LoginControl extends React.Component {
  constructor(props) {
  	// enable use of this.props
    super(props);
    // bind to allow use of this.handleLoginClick() outside of constructor
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    // set initial state isLoggedIn to false
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
  	// passed in from state above
    const isLoggedIn = this.state.isLoggedIn;
    
    const button = isLoggedIn ? (
      <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
      <LoginButton onClick={this.handleLoginClick} />
    );

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);

// Cool ternary operator example
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}