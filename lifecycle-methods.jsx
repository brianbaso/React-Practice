/*
	In applications with many components, it’s very important to free up resources
	taken by the components when they are destroyed.

	We want to set up a timer whenever the Clock is rendered to the DOM for the first
	time. This is called “mounting” in React.

	We also want to clear that timer whenever the DOM produced by the Clock is 
	removed. This is called “unmounting” in React.
*/

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}

	// The two methods below are called 'lifecycle hooks'
	/*
		While this.props is set up by React itself and this.state has a special 
		meaning, you are free to add additional fields to the class manually if you 
		need to store something that doesn’t participate in the data flow (like a 
		timer ID).
	*/
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	// Lastly, implement tick() so that Clock() will run every second
	tick() {
		this.setState({
			date: new Date()
		});
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

ReactDOM.render(<Clock />, document.getElementById('root'));

/*
	Recap:
	1. <Clock /> is called by ReactDOM.render, React calls the constructor.
	The constructor creates an object for this.state. The object holds the
	current time.

	2. React calls the component's render() method. Now React knows how to
	update the DOM. 
	
	3. Once Clock is created on the DOM, componentDidMount() is called and
	the Clock component tells the browser to set up a timer to call tick()
	every second.

	4. The clock component schedules a UI update by calling setState(),
	when setState() is called, React knows to call render again because the
	state has changed. 'this.state.date' is different so the DOM updates.
	
	5. If the clock component is ever removed, componentDidUnmount() will
	be called, and the timer will stop.
*/