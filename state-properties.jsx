// Three things to know about setState()

// 1. Do not modify state directly

// Wrong
this.state.comment = 'hello';
// Right
this.setState({comment: 'hello'});
// the only place you can assign this.state is in the constructor

// 2. State updates may be asynchronous
// React may batch multiple setState() calls into a single update for performance.

// Because this.props and this.state may be updated asynchronously, you should not 
// rely on their values for calculating the next state.

// Wrong
this.setState({
	counter: this.state.counter + this.props.increment;
});

// Right
/*
	To fix it, use a second form of setState() that accepts a function rather 
	than an object. That function will receive the previous state as the first 
	argument, and the props at the time the update is applied as the second 
	argument:
*/
// (parameters) => ({return value});
this.setState((prevState, props) => ({
	counter: prevState.counter + props.increment
}));

// Alt solution without arrow function
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});

// 3. State updates are merged
// When setState is called, the objects you provide are merged into the state
// Your state might contain multiple independent variables
constructor(props) {
	super(props);
	this.state = {
		posts: [],
		comments: []
	};
}

// Update your independent variables with multiple setState() calls
componentDidMount() {
	fetchPosts().then(response => {
		this.setState({
			posts: response.posts
		});
	});

	fetchComments().then(response => {
		this.setState({
			comments: response.comments
		});
	});
}


