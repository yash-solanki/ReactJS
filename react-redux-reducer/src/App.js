import React from 'react';
import './App.css';

class App extends React.Component {
  render() {


    function counter(state, action) {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state - 1;
        default:
          return state;
      }
    }

    expect(
        counter(0, {type: 'INCREMENT'})
    ).toEqual(1);
    expect(
        counter(1, {type: 'INCREMENT'})
    ).toEqual(2);
    expect(
        counter(2, {type: 'DECREMENT'})
    ).toEqual(1);

    console.log('TEST PASSED');

    return (
        <div className="App">
        </div>
    );
  }
}

export default App;
