// import React from "react";
// import styled from "styled-components";

// const Button = styled.button`
//   background-color: lightgrey;
//   border: 1px solid black;
//   border-radius: 5px;
//   margin: 5px;
// `;

// const Title = styled.h3`
//   padding: 8px;
// `;

// const Input = styled.input`
//   margin: 8px;
// `;

// const Section = styled.section`
//   position: fixed;
//   background: white;
//   width: 20%;
//   height: auto;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// const ModalDiv = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.6);
// `;

// const Modal = props => {
//   return (
//     <ModalDiv>
//       <Section>
//         <Title>Add New Task</Title>
//         <Input
//           value={props.taskName}
//           placeholder="Input Task Content..."
//           onChange={props.getUserInput}
//         />
//         <Button onClick={props.saveNewTask}>Save</Button>
//         <Button onClick={props.hideModal}>Cancel</Button>
//       </Section>
//     </ModalDiv>
//   );
// };

// export default Modal;



import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const classes= ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class AlertDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openAddTaskModal}
          onClose={this.props.hideModal}
          aria-labelledby="alert-dialog-addTask"
          aria-describedby="alert-dialog-content"
        >
          <DialogTitle id="alert-dialog-addTask">{"Add New Task"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-content">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="Add-task"
                  label="Task Name"
                  value={this.props.taskName}
                  onChange={this.props.getUserInput}
                  margin="normal"
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.hideModal} color="secondary" >
              Cancel
            </Button>
            <Button onClick={this.props.saveNewTask} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
