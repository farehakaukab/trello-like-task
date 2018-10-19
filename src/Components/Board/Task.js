import styled from "styled-components";
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditTaskModal from "../Modals/EditTaskModal";
import IconEditButton from "../Buttons/IconEditButton";
import IconDeleteButton from "../Buttons/IconDeleteButton";

const TaskContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  display: flex;
  background-color: ${props => (props.isDragging ? "lightgrey" : "white")};
`;

const TaskContent = styled.p`
  padding: 20px;
  padding-left: 0px;
  margin-right: auto;
`;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      editedTaskName: this.props.task.content
    };
  }

  openEditTaskModal = () => {
    this.setState({ showEditModal: true });
  };

  getUserInput = event => {
    return (event.target.value != ""
      ? this.setState({ editedTaskName: event.target.value })
      : null);
  };

  saveEditedTask = () => {
    this.props.editTask(this.state.editedTaskName, this.props.task.id);
    this.hideModal();
  };

  hideModal = () => {
    this.setState({ showEditModal: false});
  };

  deleteATask = () => {
    this.props.deleteTask(this.props.task.id, this.props.boardId);
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <TaskContent>{this.props.task.content}</TaskContent>
            <IconEditButton openEditTaskModal={this.openEditTaskModal} />
            <IconDeleteButton deleteTask={this.deleteATask} />
            {this.state.showEditModal ? (
              <EditTaskModal
                openEditTaskModal={this.openEditTaskModal}
                hideModal={this.hideModal}
                saveEditedTask={this.saveEditedTask}
                editedTaskName={this.state.editedTaskName}
                getUserInput={this.getUserInput}
              />
            ) : null}
          </TaskContainer>
        )}
      </Draggable>
    );
  }
}

export default Task;
