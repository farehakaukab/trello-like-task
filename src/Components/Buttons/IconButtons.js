import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

let iconbutton;
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

function FloatingActionButtons(props) {
  const { classes } = props;
  if (props.label === "Add") iconbutton = <AddIcon />;
  else if (props.label === "Edit") iconbutton = <EditIcon />;
  else iconbutton = <DeleteIcon />;

  return (
    <div>
      <IconButton
        variant="fab"
        mini
        aria-label={props.label}
        className={classes.button}
        onClick={props.handleClick}
      >
        {iconbutton}
      </IconButton>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
