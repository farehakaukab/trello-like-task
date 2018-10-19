import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      {props.deleteBoard != undefined ? (
        <IconButton
          aria-label="Delete"
          className={classes.button}
          onClick={props.deleteBoard}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ) : (
        <IconButton
          aria-label="Delete"
          className={classes.button}
          onClick={props.deleteTask}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
