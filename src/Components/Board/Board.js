import React, { Component } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import InnerList from "./InnerList";
import Modal from "../TaskModal";
import TitleModal from "../EditTitle";

const BoardContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: "white";
`;
const AddButton = styled.button`
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 500px;
  margin: 8px;
`;

const EditTitleButton = styled.button`
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 1000px;
  margin: 8px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TasksList = styled.div`
  flex-grow: 1;
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  min-height: 100px;
`;

class Board extends Component {
  constructor(props) {
    super(props);
    this.openAddTaskModal = this.openAddTaskModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.saveNewTask = this.saveNewTask.bind(this);
    this.getUserInput = this.getUserInput.bind(this);
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

  render() {
    return (
      <Draggable draggableId={this.props.board.id} index={this.props.index}>
        {provided => (
          <BoardContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
            showModal={this.state.showModal}
          >
            <Title {...provided.dragHandleProps}>
              {this.state.editTitle ? (
                <TitleModal
                  hideModal={this.hideModal}
                  saveNewTitle={this.saveNewTitle}
                  title={this.state.title}
                  getUserInput={this.getUserInput}
                />
              ) : (
                this.state.title
              )}
              <EditTitleButton onClick={this.openEditTitleModal}>
                Edit Title
              </EditTitleButton>
            </Title>
            <AddButton onClick={this.openAddTaskModal}>Add New Task</AddButton>
            {this.state.showModal ? (
              <Modal
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
                    tasks={this.props.tasks}
                  />

                  {provided.placeholder}
                </TasksList>
              )}
            </Droppable>
          </BoardContainer>
        )}
      </Draggable>
    );
  }
}
export default Board;
