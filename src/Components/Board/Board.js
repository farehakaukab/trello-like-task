import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerList from "./InnerList";
import Modal from "../Modals/AddTaskModal";
import TitleModal from "../Modals/EditTitleModal";
import IconAddButton from "../Buttons/IconAddButtons";
import IconDeleteButton from "../Buttons/IconDeleteButton";
import IconEditButton from "../Buttons/IconEditButton";

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
      showModal: false,
      editTitle: false,
      title: this.props.board.title,
      newTaskName: ""
    };
  }

  openAddTaskModal = () => {
    this.setState({ showModal: true });
  };

  openEditTitleModal = () => {
    this.setState({ editTitle: true });
  };

  getUserInput = event => {
    !this.state.editTitle
      ? this.setState({ newTaskName: event.target.value })
      : this.setState({ title: event.target.value });
  };

  hideModal = () => {
    this.setState({ showModal: false, newTaskName: "", editTitle: false });
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
    console.log("control in board");
    return (
      <Draggable draggableId={this.props.board.id} index={this.props.index}>
        {provided => (
          <BoardContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            showModal={this.state.showModal}
          >
            <BoardHeader {...provided.dragHandleProps}>
              <Title>{this.props.board.title}</Title>
              {this.state.editTitle ? (
                <TitleModal
                  hideModal={this.hideModal}
                  saveNewTitle={this.saveNewTitle}
                  title={this.state.title}
                  getUserInput={this.getUserInput}
                  openEditTitleModal={this.openEditTitleModal}
                />
              ) : null}
              <IconEditButton openEditTitleModal={this.openEditTitleModal} />
              <IconDeleteButton deleteBoard={this.deleteABoard} />
            </BoardHeader>
            {this.state.showModal ? (
              <Modal
                openAddTaskModal={this.openAddTaskModal}
                hideModal={this.hideModal}
                saveNewTask={this.saveNewTask}
                taskName={this.state.newTaskName}
                getUserInput={this.getUserInput}
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
            <IconAddButton openAddTaskModal={this.openAddTaskModal} />
          </BoardContainer>
        )}
      </Draggable>
    );
  }
}
export default Board;
