// listItems is an array of elements 
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('root'));

// It is normal to render lists inside of components
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
  	// include a key with each li element to avoid warning
    <li key="{number.toString()}">
    	{number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	// Run NumberList functional component with numbers array
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

// Good key for list items
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
// Last resort key for list items
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);

