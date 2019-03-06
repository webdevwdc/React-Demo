import React, { useState } from "react";
import "../form.scss";
import { Grid, Button } from "@material-ui/core";
import DropItem from "../../../components/drop-item";
import LeftSidebar from "../../../components/leftSideBar";
import RightSidebar from "../../../components/rightSideBar";

const DragAndDropPlacehoder = dropOver => (
  <div className="dropContent">
    <span className="dragDrop">
      <strong>Drag and Drop</strong> form elements over from the left panel
      <br /> to start building your form
    </span>
  </div>
);
const DropItemContentRender = ({ data }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: data }} />
  </div>
);

const Edit = () => {
  const [dropItems, setDropItems] = useState([]);
  const [dropOver, setDropOver] = useState(false);
  const [title, setTitle] = useState("Untitled Form");
  return (
    <>
      <LeftSidebar />
      <DropItem
        onDropOver={() => setDropOver(true)}
        onDrop={dropItem => {
          setDropOver(false);
          setDropItems([...dropItems, dropItem.content]);
        }}
      >
        <div className="dropSection formElement_dropsection">
          <Grid container justify="space-between">
            <Grid item>
              <input
                type="text"
                placeholder="Enter form"
                className="formTitle"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className="bottomMargin20"
              >
                Save
              </Button>
            </Grid>
          </Grid>
          {dropOver ? (
            <DragAndDropPlacehoder dropOver={dropOver} />
          ) : dropItems.length ? (
            dropItems.map((data, key) => (
              <DropItemContentRender data={data} key={key} />
            ))
          ) : (
            <DragAndDropPlacehoder />
          )}
        </div>
      </DropItem>
      <RightSidebar />
    </>
  );
};

export default Edit;
