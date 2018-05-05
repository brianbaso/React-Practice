/*
	Elements are made up of components. React elements are immutable. 
	Once you create an element, you can’t change its children or attributes.
	An element is like a single frame in a movie: it represents the UI at
	a certain point in time.
*/

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
