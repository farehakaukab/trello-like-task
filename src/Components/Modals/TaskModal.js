import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: lightgrey;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const Input = styled.input`
  margin: 8px;
`;

const Section = styled.section`
  position: fixed;
  background: white;
  width: 20%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = props => {
  return (
    <ModalDiv>
      <Section>
        <Title>Add New Task</Title>
        <Input
          value={props.taskName}
          placeholder="Input Task Content..."
          onChange={props.getUserInput}
        />
        <Button onClick={props.saveNewTask}>Save</Button>
        <Button onClick={props.hideModal}>Cancel</Button>
      </Section>
    </ModalDiv>
  );
};

export default Modal;
