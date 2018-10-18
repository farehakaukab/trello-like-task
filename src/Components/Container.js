import React, { Component } from "react";
import initialData from "../Data/initialData";
import Board from "../Components/Board/Board";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "./BoardModal";
import {
  dragAndDropBoards,
  dragAndDropTasks,
  addNewTask,
  addNewBoard,
  editTask,
  editTitle
} from "../Actions/Actions";

const WrapperContainer = styled.div`
  display: flex;
`;

const AddBoardButton = styled.button`
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 1000px;
  margin: 8px;
`;

class Container extends Component {
  constructor(props) {
    super(props);
    this.openAddBoardModal = this.openAddBoardModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.saveNewBoard = this.saveNewBoard.bind(this);
    this.getUserInput = this.getUserInput.bind(this);
    this.state = {
      showModal: false,
      boardTitle: ""
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
    this.setState({ showModal: true });
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

    if (type == "column") {
      this.props.dragAndDropBoards(destination, source, draggableId);
      return;
    }

    this.props.dragAndDropTasks(destination, source, draggableId);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <AddBoardButton onClick={this.openAddBoardModal}>
          Add New Board
        </AddBoardButton>
        {this.state.showModal ? (
          <Modal
            hideModal={this.hideModal}
            saveNewBoard={this.saveNewBoard}
            title={this.state.boardTitle}
            getUserInput={this.getUserInput}
            openAddBoardModal={this.openAddBoardModal}
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
    dragAndDropTasks
  }
)(Container);

export default Container;
