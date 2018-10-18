import React, { Component } from "react";
import Task from "./Task";

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tasks === this.props.tasks ? false : true;
  }

  render() {
    return this.props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        editTask={this.props.editTask}
      />
    ));
  }
}
export default InnerList;
