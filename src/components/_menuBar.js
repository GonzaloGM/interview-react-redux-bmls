import React, { memo } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = () => ({
  menuItem: {
    color: "white",
    textDecoration: "none",
    padding: "14px 5px",
    fontWeight: 300,
    display: "block",
    textTransform: "uppercase",
    "&:hover": {
      color: "#4eb69d"
    }
  }
});

const MenuBar = memo(({ classes }) => (
  <Grid container spacing={16} alignItems="center">
    <Link className={classes.menuItem} to="/">
      Instructions
    </Link>
    |
    <Link className={classes.menuItem} to="/exercise">
      Exercise
    </Link>
    |
    <Link className={classes.menuItem} to="/json">
      JSON
    </Link>
  </Grid>
));

const ComposedComponent = compose(withStyles(styles))(MenuBar);

export default ComposedComponent;
