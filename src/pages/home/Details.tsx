import React from "react";
import { RouteComponentProps } from "react-router";

export default ({ match }: RouteComponentProps<any>) => {
  return <div>{match.params.name}</div>;
};
