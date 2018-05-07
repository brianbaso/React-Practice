// An alternative to the code below
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

// We can embed expressions in curly braces and rewrite this as
function NumberList(props) {
	const numbers = props.numbers;

	return (
		<ul>
			{numbers.map((number) =>
				<ListItem key={number.toString()} value={number} />
			)}
		</ul>
		);
}