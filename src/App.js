import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { render } from "./utils";
import "./App.scss";
// Component and screens import
const Nomatch = lazy(() => import("./screens/noMatch"));
const Header = lazy(() => import("./components/header"));
// workflow
const WorkflowAdd = lazy(() => import("./screens/workflow/add"));
const WorkflowEdit = lazy(() => import("./screens/workflow/edit"));
const WorkflowList = lazy(() => import("./screens/workflow/list"));
// form
const FormAdd = lazy(() => import("./screens/form/add"));
const FormEdit = lazy(() => import("./screens/form/edit"));
const FormList = lazy(() => import("./screens/form/list"));

export default () => (
  <BrowserRouter>
    <Suspense fallback={<div className="loader loader-circle"></div>}>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Paper className="display_flex noBackgroundColor">
            <Switch>
              <Route exact path="/" render={render(<WorkflowList />)} />
              {/* Workflow Routes */}
              <Route
                exact
                path="/workflow/list"
                component={render(<WorkflowList />)}
              />
              <Route
                exact
                path="/workflow/add"
                component={render(<WorkflowAdd />)}
              />
              <Route
                exact
                path="/workflow/edit/:id"
                component={render(<WorkflowEdit />)}
              />
              {/* Form Routes */}
              <Route path="/form/list" component={render(<FormList />)} />
              <Route path="/form/add" component={render(<FormAdd />)} />
              <Route path="/form/edit" component={render(<FormEdit />)} />
              {/* No match */}
              <Route component={render(<Nomatch />)} />
            </Switch>
          </Paper>
        </main>
      </div>
    </Suspense>
  </BrowserRouter>
);
