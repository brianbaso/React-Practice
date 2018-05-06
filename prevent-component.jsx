function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}


class Page extends React.Component {
  constructor(props) {
    super(props);
    // this.props, this.state enabled
    this.state = {showWarning: true};
    // allow handleToggleClick outside of constructor
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        {/*WarningBanner functional component
          this.state.showWarning from constructor*/}
        <WarningBanner warn={this.state.showWarning} />

        {/* handleToggleClick button to change state */}
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

// Step 1: ReactDOM renders Page (class component)
ReactDOM.render(
  <Page />,
  document.getElementById('root')
);