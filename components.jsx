// Functional component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class component (ES6)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const elementWelcome = <Welcome name="Sara" />;

function kikaFeatures(cat) {
  if (cat) {
  return 'Kika is ' + cat.color + ' and  ' + cat.coat + '.'; 
  } else {
    return 'Kika is a super cat.';
  }
}

function kikaActivities(cat) {
  if (cat) {
    return cat;
  } else {
    return 'Kika is lazy today.';
  }
}

function KikaColor(props) {
	return <h1>Kika is a {props.color} cat.</h1>;
}

const cat = {
  name: 'kika',
  color: 'white',
  coat: 'spotted',
  actOne: 'Go to work',
  actTwo: 'Eat'
};

const element = <h1>{kikaFeatures()}</h1>;
      
const kitten = (
  <div>
    <h1>{kikaActivities(cat.name)} Todos</h1>
    <h3>{kikaActivities(cat.actOne)}</h3>
    <h3>{kikaActivities(cat.actTwo)}</h3>
  </div>
);
                     
const userDefinedComponent = <KikaColor color="white" />;

ReactDOM.render(
  userDefinedComponent,
  document.getElementById('root')
);