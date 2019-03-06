import React, { Component } from "react";
import "./header.scss";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Grid container spacing={40} justify="space-between">
          <Grid item>
          <NavLink
              activeClassName="active"
              to="/"
            >
              <h2>Form Designer</h2>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink
              activeClassName="active"
              to="/workflow/add"
              className="headerMenu"
            >
              Create Workflow
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/form/add"
              className="headerMenu"
            >
              Create Form
            </NavLink>
            <NavLink activeClassName="active" to="/form/list" className="headerMenu">
              My Forms
            </NavLink>
          </Grid>
        </Grid>
      </header>
    );
  }
}

export default Header;
