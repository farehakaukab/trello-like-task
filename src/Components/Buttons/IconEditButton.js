import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import EditIcon from "@material-ui/icons/Edit";
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
      {props.openEditTitleModal != undefined ? (
        <IconButton
          aria-label="Delete"
          className={classes.button}
          onClick={props.openEditTitleModal}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ) : (
        <IconButton
          aria-label="Delete"
          className={classes.button}
          onClick={props.openEditTaskModal}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
