import React, { useContext, useEffect } from "react";
import BuffMenu from "./BuffMenu";
import MundusMenu from "./MundusMenu";
import { BuildContext } from "../BuildStateContext";

export default () => {
  const [state] = useContext(BuildContext);
  useEffect(() => {
    localStorage.setItem("buildState", JSON.stringify(state));
  }, [state]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <BuffMenu />
      <MundusMenu />
    </div>
  );
};
