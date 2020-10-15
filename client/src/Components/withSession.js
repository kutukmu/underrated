import React from "react";
import { ME_QUERY } from "../queries";
import { useQuery } from "@apollo/client";

const withSession = (Component) => (props) => {
  const { client, loading, error, data, refetch } = useQuery(ME_QUERY);

  if (loading) {
    return null;
  }

  if (error) {
    throw new Error(error);
  }
  return (
    <Component {...props} session={data} refetch={refetch} client={client} />
  );
};

export default withSession;
