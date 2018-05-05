/*
    Unlike browser DOM elements, React elements are plain objects,
    and are cheap to create. React DOM takes care of updating the
    DOM to match the React elements.
*/

const elementOne = (
  <h1 className="greeting">
    Hello, world
  </h1>
);

const elementTwo = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world'
);

// Note: this structure is simplified
const elementThree = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};


ReactDOM.render(elementThree, document.getElementById('root'));