import React, { Component } from "react";

class Counter extends Component {

  // constructor() {
  //   super();
  //   this.clickBtn = this.clickBtn.bind(this);
  // }

  state = {
    value: this.props.value,
    imgUrl: "https://picsum.photos/300",
    tags: ["tag1", "tag2", "tag3"],
    elements: ["one", "two", "three"]
  };
  // const elements = ['one', 'two', 'three'];
  clickBtn = () => {
    this.setState({count: this.state.value + 1})
  }

  render() {
    let classes = this.getBadgeClasses();
    return (
      <div>
        <img src={this.state.imgUrl} alt="no image found"></img>
        <span className={classes}>{this.formateCount()}</span>
        <button onClick={this.clickBtn} className="btn btn-secondary btn-sm">
          Increment
        </button>
        <ul>
          {this.state.tags.map((tag, index) => {
            return <li key={index}>{tag}</li>;
          })}
        </ul>
        <ul>
          {this.state.elements.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
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
