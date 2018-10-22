import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

let helperText;
const classes = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
};

const AlertDialog = props => {
  if (props.textfieldId == "board-title")
    helperText = "Please enter board title";
  else if (props.textfieldId == "task-title")
    helperText = "Please enter task title";
  else helperText = "Please fill the textfield";
  return (
    <div>
      <Dialog
        open={props.openModalHandler}
        onClose={props.hideModalHandler}
        aria-labelledby="alert-dialog"
        aria-describedby="alert-dialog-content"
      >
        <DialogTitle id="alert-dialog">{props.modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-content">
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id={props.textfieldId}
                label="Name"
                value={props.textfieldValue}
                onChange={props.onChangeHandler}
                margin="normal"
                helperText={helperText}
                error={props.textfieldValue.length === 0 ? true : false}
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hideModalHandler} color="secondary">
            Cancel
          </Button>
          <Button
            disabled={props.textfieldValue.length === 0 ? true : false}
            onClick={props.saveButtonHandler}
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
