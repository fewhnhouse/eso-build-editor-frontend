import React from "react";
import Menu from "./Menu";

export default () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Menu />
      <div style={{flex: 1}}>Mundus</div>
    </div>
  );
};
