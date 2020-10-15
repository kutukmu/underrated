import React from "react";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { ME_QUERY } from "../queries";

const withAuth = (conditionFunction) => (Component) => (props) => {
  const { data, loading } = useQuery(ME_QUERY);
  if (loading) return null;
  return conditionFunction(data) ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  );
};

export default withAuth;
