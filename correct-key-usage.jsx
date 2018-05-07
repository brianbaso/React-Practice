// Keys only make sense in context of the surrounding array
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

// Correct key usage below
// *****
// Functional component turns props into list elements
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}
// 
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    // Each element is turned into a li element with a key
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
  	
    <ul>
      {listItems}
    </ul>
  );
}
// Calling starts here, NumberList functional component is called with
// numbers array below.
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
	// Call NumberList with property 'numbers array'
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);