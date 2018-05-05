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
                     
ReactDOM.render(kittenX, document.getElementById('root'));