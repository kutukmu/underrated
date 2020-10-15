import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Home from "./Components/Home";
import withSession from "./Components/withSession";
import Songs from "./Components/Posts";
import Song from "./Components/Song";
import history from "./history";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import Layout from "./Components/Layout";
import AddSong from "./Components/AddSong";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import EditSong from "./Components/editSong";
import "./index.css";

const httpLink = createHttpLink({
  uri: "https://underrated.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});

const Root = (props) => {
  const { session, refetch, client } = props;
  return (
    <Router history={history}>
      <Fragment>
        <Layout
          history={history}
          session={session}
          refetch={refetch}
          client={client}
        >
          <Switch exact>
            <Route path="/" exact component={Home} />
            <Route
              path="/songs/:id"
              exact
              render={(props) => (
                <Song {...props} session={session} refetch={refetch} />
              )}
            />
            <Route
              path="/user/songs/:id/edit"
              exact
              render={(props) => (
                <EditSong {...props} session={session} refetch={refetch} />
              )}
            />
            <Route
              path="/signin"
              exact
              render={(props) => (
                <SignIn {...props} session={session} refetch={refetch} />
              )}
            />
            <Route
              path="/signup"
              exact
              render={(props) => (
                <SignUp {...props} session={session} refetch={refetch} />
              )}
            />
            <Route
              path="/songs"
              exact
              render={(props) => (
                <Songs {...props} session={session} refetch={refetch} />
              )}
            />
            <Route
              path="/addsong"
              exact
              render={(props) => (
                <AddSong {...props} session={session} refetch={refetch} />
              )}
            />
            <Route
              path="/search"
              exact
              render={(props) => (
                <Search {...props} session={session} refetch={refetch} />
              )}
            />

            <Route
              path="/user/:id"
              exact
              render={(props) => (
                <Profile {...props} session={session} refetch={refetch} />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Fragment>
    </Router>
  );
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.querySelector("#root")
);
