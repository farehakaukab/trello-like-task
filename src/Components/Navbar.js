import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Plan Your Day
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
