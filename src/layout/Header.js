import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import logo from "../assets/images/logo.png";

type Props = {
  classes: Object
};

const styles = {
  root: {
    flexGrow: 1,
   

  },
  logo: {
    display: "block",
    margin: "0 auto",
    height: "55px",
    width: "auto",
    padding: "10px 0 6px",
    filter: "brightness(0) invert(1)"
  }
};

function Header(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <img src={logo} className={classes.logo} alt="Test" />
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
