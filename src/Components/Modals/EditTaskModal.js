import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const classes = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class AlertDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.openEditTaskModal}
          onClose={this.props.hideModal}
          aria-labelledby="alert-dialog-edittask"
          aria-describedby="alert-dialog-content"
        >
          <DialogTitle id="alert-dialog-edittask">{"Edit Task"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-content">
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="task-name"
                  label="Name"
                  value={this.props.editedTaskName}
                  onChange={this.props.getUserInput}
                  margin="normal"
                  helperText="Please enter a name of the task"
                  error={this.props.editedTaskName.length === 0 ? true : false}
                />
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.hideModal} color="secondary">
              Cancel
            </Button>
            <Button
              disabled={this.props.editedTaskName.length === 0 ? true : false}
              onClick={this.props.saveEditedTask}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
