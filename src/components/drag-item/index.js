import React, { useState, useRef } from "react";
import "./styles.css";
import useDrag from "../../hooks/useDrag";
import View from "./view";

const Drag = ({ dragEffect = 'move', data }) => {
  const dragRef = useRef(null);
  const [classValue, setClassValue] = useState("grab");
  useDrag({
    data,
    effect: dragEffect,
    ref: dragRef,
    onDragStart: () => setClassValue("grabbing"),
    onDragEnd: () => {
      setClassValue("grab");
    }
  });
  return <View ref={dragRef} data={data} classValue={classValue} />;
}

export default Drag;
