import React, { Component } from "react";
import Board from "../Components/Board/Board";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import Modal from "./Modals/Modal";
import Navbar from "../Components/Navbar";
import Buttons from "../Components/Buttons/Buttons";
import {
  dragAndDropBoards,
  dragAndDropTasks,
  addNewTask,
  addNewBoard,
  editTask,
  editTitle,
  deleteBoard,
  deleteTask
} from "../Actions/Actions";

const WrapperContainer = styled.div`
  display: flex;
`;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      boardTitle: " "
    };
  }

  saveNewBoard = () => {
    this.props.addNewBoard(this.state.boardTitle);
    this.hideModal();
  };

  getUserInput = event => {
    this.setState({ boardTitle: event.target.value });
  };

  openAddBoardModal = () => {
    this.setState({ showModal: true, boardTitle: " " });
  };

  hideModal = () => {
    this.setState({ showModal: false, boardTitle: "" });
  };

  onDragEnd = results => {
    const { destination, source, draggableId, type } = results;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      this.props.dragAndDropBoards(destination, source, draggableId);
      return;
    }

    this.props.dragAndDropTasks(destination, source, draggableId);
  };

  render() {
    console.log("control in container render");
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Navbar />
        <Buttons openAddBoardModal={this.openAddBoardModal} />
        {this.state.showModal ? (
          <Modal
            modalTitle="Add New Board"
            textfieldId="board-title"
            openModalHandler={this.openAddBoardModal}
            hideModalHandler={this.hideModal}
            saveButtonHandler={this.saveNewBoard}
            textfieldValue={this.state.boardTitle}
            onChangeHandler={this.getUserInput}
          />
        ) : null}
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <WrapperContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {this.props.boardOrder.map((boardId, index) => {
                const board = this.props.Board[boardId];
                const tasks = board.taskIds.map(
                  taskId => this.props.tasks[taskId]
                );
                return (
                  <Board
                    key={board.id}
                    board={board}
                    tasks={tasks}
                    index={index}
                    addNewTask={this.props.addNewTask}
                    editTask={this.props.editTask}
                    editTitle={this.props.editTitle}
                    deleteBoard={this.props.deleteBoard}
                    deleteTask={this.props.deleteTask}
                  />
                );
              })}
              {provided.placeholder}
            </WrapperContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  boardOrder: state.boardOrder,
  Board: state.Board,
  tasks: state.tasks
});

Container = connect(
  mapStateToProps,
  {
    editTitle,
    editTask,
    addNewBoard,
    addNewTask,
    dragAndDropBoards,
    dragAndDropTasks,
    deleteBoard,
    deleteTask
  }
)(Container);

export default Container;
