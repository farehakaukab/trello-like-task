import styled from "styled-components";
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import Modal from "../Modals/Modal";
import IconButton from "../Buttons/IconButtons";

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
      editedTaskName: ''
    };
  }

  openEditTaskModal = () => {
    this.setState({ showEditModal: true, editedTaskName: this.props.task.content });
  };

  getUserInput = event => {
    this.setState({ editedTaskName: event.target.value });
  };

  saveEditedTask = () => {
    this.props.editTask(this.state.editedTaskName, this.props.task.id);
    this.hideModal();
  };

  hideModal = () => {
    this.setState({ showEditModal: false });
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
            <IconButton handleClick={this.openEditTaskModal} label="Edit"/>
            <IconButton handleClick={this.deleteATask} label="Delete"/>
            {this.state.showEditModal ? (
              <Modal
                modalTitle="Edit Task"
                textfieldId={"task-title"}
                openModalHandler={this.openEditTaskModal}
                hideModalHandler={this.hideModal}
                saveButtonHandler={this.saveEditedTask}
                textfieldValue={this.state.editedTaskName}
                onChangeHandler={this.getUserInput}
              />
            ) : null}
          </TaskContainer>
        )}
      </Draggable>
    );
  }
}

export default Task;
