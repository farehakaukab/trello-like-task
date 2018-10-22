import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerList from "./InnerList";
import Modal from "../Modals/Modal";
import IconButton from "../Buttons/IconButtons";

const BoardContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const BoardHeader = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 8px;
  border-bottom: 3px solid grey;
`;

const Title = styled.h4`
  padding: 20px;
  padding-left: 5px;
  margin-right: auto;
`;

const TasksList = styled.div`
  flex-grow: 1;
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "grey" : "white")};
  min-height: 100px;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditTitleModal: false,
      showEditTitleModal: false,
      title: '',
      newTaskName: ' '
    };
  }

  openAddTaskModal = () => {
    this.setState({ showAddTaskModal: true, newTaskName : ' ' });
  };

  openEditTitleModal = () => {
    this.setState({ showEditTitleModal: true, title: this.props.board.title });
  };

  getUserInput = event => {
    !this.state.showEditTitleModal
      ? this.setState({ newTaskName: event.target.value })
      : this.setState({ title: event.target.value });
  };

  hideModal = () => {
    this.setState({ showAddTaskModal: false, newTaskName: "", showEditTitleModal: false });
  };

  saveNewTask = () => {
    this.props.addNewTask(this.state.newTaskName, this.props.board.id);
    this.hideModal();
  };

  saveNewTitle = () => {
    this.props.editTitle(this.state.title, this.props.board.id);
    this.hideModal();
  };

  deleteABoard = () => {
    this.props.deleteBoard(this.props.board.id);
  };
  render() {
    //console.log("control in board");
    return (
      <Draggable draggableId={this.props.board.id} index={this.props.index}>
        {provided => (
          <BoardContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            showAddTaskModal={this.state.showAddTaskModal}
          >
            <BoardHeader {...provided.dragHandleProps}>
              <Title>{this.props.board.title}</Title>
              {this.state.showEditTitleModal ? (
                <Modal
                  modalTitle="Edit Board Title"
                  textfieldId="task-title"
                  hideModalHandler={this.hideModal}
                  saveButtonHandler={this.saveNewTitle}
                  textfieldValue={this.state.title}
                  onChangeHandler={this.getUserInput}
                  openModalHandler={this.openEditTitleModal}
                />
              ) : null}
              <IconButton handleClick={this.openEditTitleModal} label="Edit"/>
              <IconButton handleClick={this.deleteABoard} label="Delete"/>
            </BoardHeader>
            {this.state.showEditTitleModal ? (
              <Modal
                modalTitle="Add New Task"
                textfieldId="task-title"
                openModalHandler={this.openAddTaskModal}
                hideModalHandler={this.hideModal}
                saveButtonHandler={this.saveNewTask}
                textfieldValue={this.state.newTaskName}
                onChangeHandler={this.getUserInput}
              />
            ) : null}
            <Droppable droppableId={this.props.board.id} type="tasks">
              {(provided, snapshot) => (
                <TasksList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList
                    editTask={this.props.editTask}
                    deleteTask={this.props.deleteTask}
                    boardId={this.props.board.id}
                    tasks={this.props.tasks}
                  />
                  {provided.placeholder}
                </TasksList>
              )}
            </Droppable>
            <IconButton handleClick={this.openAddTaskModal} label="Add" />
          </BoardContainer>
        )}
      </Draggable>
    );
  }
}
export default Board;
