import styled from "styled-components";
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import Modal from "../EditModal";

const TaskContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;

const EditTaskButton = styled.button`
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 1000px;
  float: right;
`;

class Task extends Component {
  constructor(props) {
    super(props);
    this.openEditTaskModal = this.openEditTaskModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.saveEditedTask = this.saveEditedTask.bind(this);
    this.getUserInput = this.getUserInput.bind(this);
    this.state = {
      showEditModal: false,
      editedTaskName: this.props.task.content
    };
  }

  openEditTaskModal = () => {
    this.setState({ showEditModal: true });
  };

  getUserInput = event => {
    this.setState({ editedTaskName: event.target.value });
  };

  saveEditedTask = () => {
    this.props.editTask(this.state.editedTaskName, this.props.task.id);
    this.hideModal();
  };

  hideModal = () => {
    this.setState({ showEditModal: false, editedTaskName: "" });
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
            {this.props.task.content}
            <EditTaskButton onClick={this.openEditTaskModal}>
              Edit
            </EditTaskButton>
            {this.state.showEditModal ? (
              <Modal
                hideModal={this.hideModal}
                saveEditedTask={this.saveEditedTask}
                editedTaskName={this.state.editedTaskName}
                getUserInput={this.getUserInput}
                hideModal={this.hideModal}
              />
            ) : null}
          </TaskContainer>
        )}
      </Draggable>
    );
  }
}

export default Task;
