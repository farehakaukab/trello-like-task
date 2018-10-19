import React, { Component } from "react";
import Task from "./Task";

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.tasks === this.props.tasks ? false : true;
  }

  render() {
    console.log("control in tasks")
    return this.props.tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        boardId={this.props.boardId}
        editTask={this.props.editTask}
        deleteTask={this.props.deleteTask}
      />
    ));
  }
}
export default InnerList;
