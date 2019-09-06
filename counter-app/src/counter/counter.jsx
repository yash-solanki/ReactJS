import React, { Component } from "react";

class Counter extends Component {

  state = {
    value: this.props.value,
  };
  
  clickBtn = () => {
    this.setState({ value: this.state.value + 1 });
  };

  render() {
    let classes = this.getBadgeClasses();
    return (
      <div>
        <span className={classes}>{this.formateCount()}</span>
        <button onClick={this.clickBtn} className="btn btn-secondary btn-sm">
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
    return (classes += !this.state.value ? "warning" : "primary");
  }

  formateCount() {
    const { value: count } = this.state;
    return <h1>{!count ? "Zero" : count}</h1>;
  }
}

export default Counter;
