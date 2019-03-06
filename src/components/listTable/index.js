import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Switch
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";

import { uuidv4 } from "../../utils";
const noop = () => {};

const ListTable = ({
  headers = [],
  data = [],
  history,
  path,
  noRecordMsg = "No record found",
  onItemChanged = noop
}) => {
  const [getData, updateData] = useState(data);
  return (
    <Grid container justify="flex-start">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, key) => (
              <TableCell key={key}>{header}</TableCell>
            ))}
            <TableCell align="center">Status</TableCell>
            <TableCell />
            <TableCell>Actions</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {getData.length ? (
            getData.map((row, key) => (
              <TableRow key={key}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="center">
                  <Switch
                    color="primary"
                    className="switch"
                    checked={row.status}
                    onChange={() => {
                      const modified_record = Object.assign({}, row, {
                        status: !row.status
                      });
                      const newData = getData;
                      newData[key] = modified_record;
                      updateData([...newData]);
                      onItemChanged("item_status_changed", {
                        key,
                        item: modified_record
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <button
                    className="icnBtn custom_icon_btn"
                    onClick={() => {
                      updateData([
                        ...getData.slice(0, key),
                        ...getData.slice(key + 1)
                      ]);
                      onItemChanged("deleted_item", { key, item: row });
                    }}
                  >
                    <DeleteIcon className="iconStyle" /> <span> Delete</span>
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="icnBtn custom_icon_btn"
                    onClick={() => {
                      const data = [
                        ...getData.splice(0, key),
                        row,
                        Object.assign({}, row, { id: uuidv4() }),
                        ...getData.splice(key + 1)
                      ];
                      updateData(data);
                      onItemChanged("item_duplicate", { key, item: row, data });
                    }}
                  >
                    <FileCopyIcon className="iconStyle" />{" "}
                    <span>Duplicate</span>
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="icnBtn custom_icon_btn"
                    onClick={() => history.push(`/${path}/edit/${row.id}`)}
                  >
                    <EditIcon className="iconStyle" /> <span>Edit</span>
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key={uuidv4()}>
              <TableCell />
              <TableCell />
              <TableCell>{noRecordMsg}</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default ListTable;
