/*
  In this section, we will learn how to make the Clock component
  truly reusable and encapsulated. It will set up its own timer 
  and update itself every second.
*/

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

// First lets encapsulate how the clock looks
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

// However, it misses a crucial requirement: the fact that the Clock sets up a timer
// and updates the UI every second should be an implementation detail of the Clock.
// It would be nice to write this once and have clock update itself
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);



