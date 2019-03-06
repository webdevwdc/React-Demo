import { useState, useEffect } from "react";

const noop = () => {};

const useDrop = ({ ref, onDrop = noop, onDropOver = noop }) => {
  const [dropState, updateDropState] = useState("droppable");
  const [dropStart, updateDropStart] = useState(true);

  const dropOverCb = ev => {
    ev.preventDefault();
    if (dropStart) {
      onDropOver();
      updateDropStart(false);
    }
    updateDropState("dragging over");
  };

  const dropCb = ev => {
    ev.preventDefault();
    const payload = JSON.parse(ev.dataTransfer.getData("source"));
    updateDropStart(true);
    onDrop(payload);
    updateDropState("dropped");
  };

  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.addEventListener("dragover", dropOverCb);
      elem.addEventListener("drop", dropCb);
      return () => {
        elem.removeEventListener("dragover", dropOverCb);
        elem.removeEventListener("drop", dropCb);
      };
    }
  });

  return {
    dropState
  };
};

export default useDrop;
