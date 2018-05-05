
// 2) React calls the Welcome component with {name: 'Sara'} as the props.
function Welcome(props) {
  // 3) Our Welcome component returns a <h1>Hello, Sara</h1> element as the result.
  return <h1>Hello, {props.name}</h1>;
}


const element = <Welcome name="Sara" />;

// 1) We call ReactDOM.render() with the <Welcome name="Sara" /> element.
ReactDOM.render(
  element,
  document.getElementById('root')
);
// 4) React DOM efficiently updates the DOM to match <h1>Hello, Sara</h1>.


/*
	Components can refer to other components in their output. This lets us
	use the same component abstraction for any level of detail. A button, 
	a form, a dialog, a screen: in React apps, all those are commonly 
	expressed as components.
*/
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Component holding multiple Welcome components
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

