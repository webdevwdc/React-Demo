import React, { useState } from "react";
import { DiagramComponent, Node, SymbolPaletteComponent } from "@syncfusion/ej2-react-diagrams";
import { Grid, Button } from "@material-ui/core";
import "./workflow.scss";

//Initialize the flowshapes for the symbol palatte
let flowshapes = [
  { id: "Rectangle", shape: { type: "Basic", shape: "Rectangle" } },
  { id: "Triangle", shape: { type: "Basic", shape: "Triangle" } },
  { id: "Ellipse", shape: { type: "Basic", shape: "Ellipse" } },
];
//Initializes connector symbols for the symbol palette
let connectorSymbols = [
  {
    id: "Link1",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: { shape: "Arrow" },
    style: { strokeWidth: 2 }
  },
  {
    id: "link2",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    style: { strokeWidth: 2 },
    targetDecorator: { shape: "None" }
  },
  {
    id: "Link3",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: { shape: "Arrow" },
    style: { strokeWidth: 2 }
  },
  {
    id: "link4",
    type: "Straight",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    style: { strokeWidth: 2 },
    targetDecorator: { shape: "None" }
  },
  {
    id: "link5",
    type: "Bezier",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    style: { strokeWidth: 2 },
    targetDecorator: { shape: "None" }
  }
];

const SymbolPanel = () => {
  return (
    <SymbolPaletteComponent
      id="symbolpalette"
      expandMode="Multiple"
      className="symbolpalette_inner"
      palettes={[
        {
          id: "flow",
          expanded: true,
          symbols: flowshapes,
          iconCss: "e-diagram-icons1 e-diagram-flow",
          title: "Flow Shapes"
        },
        {
          id: "connectors",
          expanded: true,
          symbols: connectorSymbols,
          iconCss: "e-diagram-icons1 e-diagram-connector",
          title: "Connectors"
        }
      ]} //set default value for Node.
      getNodeDefaults={symbol => {
        if (
          symbol.id === "Terminator" ||
          symbol.id === "Process" ||
          symbol.id === "Delay"
        ) {
          symbol.width = 80;
          symbol.height = 40;
        } else if (
          symbol.id === "Decision" ||
          symbol.id === "Document" ||
          symbol.id === "PreDefinedProcess" ||
          symbol.id === "PaperTap" ||
          symbol.id === "DirectData" ||
          symbol.id === "MultiDocument" ||
          symbol.id === "Data"
        ) {
          symbol.width = 50;
          symbol.height = 40;
        } else {
          symbol.width = 50;
          symbol.height = 50;
        }
      }}
      symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
      getSymbolInfo={_ => {
        return { fit: true };
      }}
      width={"100%"}
      height={"700px"}
      symbolHeight={60}
      symbolWidth={60}
    />
  );
};

//Initializes the nodes for the diagram
let nodes = [];
let interval;
interval = [
  1,
  9,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75,
  0.25,
  9.75
];
let gridlines = {
  lineColor: "#e0e0e0",
  lineIntervals: interval
};
//Initializes the connector for the diagram
let connectors = [];

//save the diagram object in json data.
const download = data => {
  if (window.navigator.msSaveBlob) {
    var blob = new Blob([data], { type: "data:text/json;charset=utf-8," });
    window.navigator.msSaveOrOpenBlob(blob, "workflow.json");
  } else {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
    var a = document.createElement("a");
    a.href = dataStr;
    a.download = "workflow.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

const Workflow = ({ title, description }) => {
  let diagramInstance = null;
  let diagramMetadata = null;
  const [_title, setTitle] = useState(title || "Untitled Workflow");
  const [_description, setDescription] = useState(description || "Workflow description");

  const onUploadSuccess = ev => {
    let file1 = ev.target.files[0];
    if (file1.type === "application/json") {
      let reader = new FileReader();
      reader.readAsText(file1);
      reader.onloadend = event => {
        diagramInstance.loadDiagram(event.target.result);
      };
    } else {
      alert("Invalid file format. Please upload proper diagram.json");
    }
  };

  return (
    <div className="dropSection workflow_dropSection">
      <div className="workflow_wrapper">
        <div className="left_workflow">
          <div style={{ display: "none" }}>
            <input
              type="file"
              id="insertPrevious"
              onChange={ev => onUploadSuccess(ev)}
            />
          </div>
          <button
            className="add_btn"
            onClick={() => {
              document.getElementById("insertPrevious").click();
            }}
          >
            Insert previous <span>+</span>
          </button>
          <div
            id="palette-space"
            className="left_wf_innerIcon sb-mobile-palette"
          >
            <SymbolPanel />
          </div>
        </div>
        {/* Diagram space component */}
        <div className="right_workflow">
          <Grid className="header_grid" container justify="space-between">
            <Grid item>
              <input
                type="text"
                placeholder="Enter workflow title"
                className="formTitle"
                value={_title}
                onChange={e => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter workflow description"
                className="formDescription"
                value={_description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className="bottomMargin20"
                onClick={async ev => {
                  ev.preventDefault();
                  diagramMetadata = diagramInstance.saveDiagram();
                  if (diagramMetadata) download(diagramMetadata);
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <div id="diagram-space" className="sb-mobile-diagram">
            <DiagramComponent
              id="diagram"
              ref={diagram => {
                diagramInstance = diagram;
              }}
              width={"100%"}
              height={"645px"}
              nodes={nodes}
              snapSettings={{
                horizontalGridlines: gridlines,
                verticalGridlines: gridlines
              }}
              connectors={connectors}
              getConnectorDefaults={(args, diagram) => {
                args.targetDecorator.height = 5;
                args.targetDecorator.width = 5;
                args.style.strokeColor = "#797979";
                args.targetDecorator.style = {
                  fill: "#797979",
                  strokeColor: "#797979"
                };
                return args;
              }}
              //Sets the Node style for DragEnter element.
              dragEnter={args => {
                let obj = args.element;
                if (obj instanceof Node) {
                  let ratio = 100 / obj.width;
                  obj.width = 100;
                  obj.height *= ratio;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
