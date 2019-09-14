import React from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <div>
            <span>Age: {this.props.age}</span>
          </div>
          <button onClick={this.props.onAgeUp}>Age Up</button>
          <button onClick={this.props.onAgeDown}>Age Down</button>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        age: state.age
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAgeUp: () => dispatch({ type: "AGE_UP", value: 1 }),
        onAgeDown: () => dispatch({ type: "AGE_DOWN", value: 1 })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
