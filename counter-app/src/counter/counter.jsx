import React, { Component } from "react";

class Counter extends Component {

  // state = {
  //   value: this.props.value,
  // };
  
  // clickBtn = () => {
  //   this.setState({ value: this.state.value + 1 });
  // };

  render() {
    let classes = this.getBadgeClasses();
    return (
      <div>
        <span className={classes}>{this.formateCount()}</span>
        <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary btn-sm">
          Increment
        </button>
        <button onClick={() => this.props.onDelete(this.props.id)} className="btn btn-danger m-2 btn-sm">
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return (classes += !this.props.counter.value ? "warning" : "primary");
  }

  formateCount() {
    const { value } = this.props.counter;
    return <h1>{!value ? "Zero" : value}</h1>;
  }
}

export default Counter;
