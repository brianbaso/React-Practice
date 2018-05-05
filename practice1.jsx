function Greet(props) {
	return 'What\'s up, ' + props.name + '? ' + 'How\'s your ' + props.car + ' running?';
}

const element = <Greet name="Marco" car="minivan" />;

function WhatIThink(props) {
	return 'I think we should start texting in ' + props.library + ' until we understand.';
}

const elementTwo = <WhatIThink library="React" />;

ReactDOM.render(elementTwo, document.getElementById('root'));