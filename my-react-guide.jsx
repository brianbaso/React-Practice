// ***************************************
// |		      WHY JSX?			           	 |
// |								                  	 |
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
// |		    JSX COMPILED		          	 |
// |									                   |
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
// |		    REACT ELEMENTS	         		 |
// |									                   |
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
// |		   REACT COMPONENTS		           |
// |									                   |
// ***************************************
/*
	Components let you split the UI into independent, reusable pieces, 
	and think about each piece in isolation.

	Conceptually, components are like JavaScript functions. They accept 
	arbitrary inputs (called “props”) and return React elements describing 
	what should appear on the screen.

	**********	  ***************    ************
	|		      |	  |		   		    |    |			    |
	| props   | =>|	components  | => | elements |
	|		      |   |	       		  |    |			    |
	**********	  ***************    ************
*/

// ***************************************
// |		 FUNCTIONAL VS STATE		         |
// |			 COMPONENTS				              |
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
// |		 EXTRACTING COMPONENTS		       |
// |									                   |
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
// |		  NOTES ON PROPS	 		           |
// |									                   |
// ***************************************
/*
	- Use props to pass data & event handlers down to your child components.
	- Both functional and class components cannot modify their props. Props are read only!
	- Props are owned by parents.

*/


// ***************************************
// |		  NOTES ON STATE	 		           |
// |									                   |
// ***************************************
/*
	- Only class components can have state.
	- State is used for internal communication inside a component.
	- State is private and fully controlled by the component.
	- State is an object owned by the component when it is declared.
	- Use state to store the data your current page needs in your controller-view.
	- You cannot modify state directly, you must use setState().
	- The only place you can assign this.state is in the constructor.
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
// |        ASYNC STATE UPDATES          |
// |                                     |
// ***************************************
// React can update state asynchronously so don't rely on the value of state to 
// calculate the next value of state. The code below could fail.
this.setState({
  counter: this.state.counter + this.props.increment,
});

// We can use a different form of setState() that accepts a function instead of an object. 😱
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

// ES5 equivalence:
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});


// ***************************************
// |		      LIFECYCLE 	 		           |
// |     (FOR CLASS COMPONENTS ONLY)	   |
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
// |		   PROPS VS STATE	 		           |
// |									                   |
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


// ***************************************
// |       TOP-DOWN DATA FLOW            |
// |              💦⤵                   |
// ***************************************
/*
    Neither parent nor child components can know if a certain component is stateful or stateless.
    They also shouldn't care if a component is a function or a class.

    This is one reason why state is local and private. It's not accessible by anyone except for
    the component that owns and sets it.
*/
// Components can pass down their state as props to children components:
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>

// This also works for user defined components
<FormattedDate date={this.state.date} />

// Formatted date as a child component would have no way to know where the state it recieved 
// came from.
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// ***************************************
// |       HANDLING EVENTS               |
// |                                     |
// ***************************************
// How to prevent default behaivor after an event in React:
// This will stop the link from opening its href tag (e.preventDefault()).
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}

// Instead of addEventListener, just provide the listener when the element is init rendered.
// When using a class component, let the event handler be a method on the class.
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

// Passing arguements to event handlers:
// No arguments:
<button onClick={this.handleClick}></button>

// Arguments:
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> 

// ***************************************
// |       CONDITIONAL RENDERING         |
// |                                     |
// ***************************************
// In React, you can create distinct components that encapsulate behavior you need. Then, 
// you can render only some of them, depending on the state of your application.
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
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

// Prevent a component from rendering in the example below:
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  // Then button gets called and state changes.. So we go back and re-render
  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  // Warning initially shows because of constructor
  // Second time render is called WarningBanner is hidden
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);

// ***************************************
// |       RENDERING MULTIPLE            |
// |          COMPONENTS                 |
// ***************************************
// You can build collections of elements and include them in JSX with {curly braces}
// Remember to include key to avoid warnings
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

// Note: Keys only make sense in the context of the surrounding array. Include key on 
// the user-defined component opposed to a <li> itself.

// You can also embed expressions in the components return statement like so.
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}

// ***************************************
// |       FORMS & CONTROLLED            |
// |          COMPONENTS                 |
// ***************************************
/*
    Forms have default behaivors in JSX similar to HTML, however its convenient to have
    a JavaScript function that handles form submissions and also can do things with the 
    data thats in the form. This technique is called controlled components.

    HTML Forms: Maintain own state, update it on their own.
    React Forms: State is held in the class constructor, only updated with setState().
*/
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    // Since state is here, React is the source of truth. handleChange() runs every
    // keystroke, state constantly updates as user types.
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
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// ***************************************
// |       LIFTING STATE UP              |
// |                                     |
// ***************************************
/*
    If we want two elements to be in sync with eachother we can lift state to the closest
    common ancestor of the components that need it. 

    Since any state “lives” in some component and that component alone can change it, the 
    surface area for bugs is greatly reduced. Additionally, you can implement any custom 
    logic to reject or transform user input.
*/
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

// Responsibility: Calculate the temperatures and display them through TemperatureInput
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  // Re-render with new input value and current scale of the input
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = (scale === 'f') ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = (scale === 'c') ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        {/* Call function depending on what box is typed in */}
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);

// ***************************************
// |       COMPOSITION & CONTAINMENT     |
// |          (SO POWERFUL!)             |
// ***************************************
// When creating elements that do not know their children ahead of time, we can use 
// containment in order to pass arbitrary children.

// Props and composition give you all the flexibility you need to customize a 
// component’s look and behavior in an explicit and safe way. Remember that components 
// may accept arbitrary props, including primitive values, React elements, or functions.
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

// Another more complex example with multiple "holes".
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

// Sometimes components have other components in them as "special cases"
// We can use composition specialization 🔥
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}