import React from "react";
import "./list.scss";
import { Grid, Button } from "@material-ui/core";
import ListTable from "../../../components/listTable";

// create data
import { createData, getHeaders } from "../../../utils";
import { withRouter } from "react-router";

const List = ({ history }) => {
  const data = [
    ...[...Array(20).keys()].map(i => createData(`Form Name ${i+1}`, `Form Description ${i+1}`, "00/00/0000", true)),
  ];
  return (
    <div className="formList">
      <div className="formListHeader">
        <Grid container justify="space-between">
          <Grid item>
            <h3 className="listTitle">My Form</h3>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/form/add")}
            >
              Create New
            </Button>
          </Grid>
        </Grid>
      </div>
      <ListTable
        data={data}
        headers={getHeaders}
        path={"form"}
        history={history}
        onItemChanged={(type, { key, item }) => {}}
      />
    </div>
  );
};

export default withRouter(List);
