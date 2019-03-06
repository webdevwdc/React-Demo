import React, { forwardRef } from "react";
import "./styles.css";

export default forwardRef(({ data, classValue }, ref) => {
  return (
    <div className={`workflow-item-holder ${classValue}`} ref={ref}>
      {data.svg}
      <div className="workflow-item-text">
        {data.text}
      </div>
    </div>
  );
});
