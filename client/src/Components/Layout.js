import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthNavbar from "./AuthNavbar";
function Layout(props) {
  const { children, home, session, client, refetch, history } = props;
  return (
    <div className="layout">
      {session && session.Me ? (
        <AuthNavbar
          {...props}
          username={session.Me.username}
          id={session.Me.id}
          client={client}
          refetch={refetch}
          history={history}
        />
      ) : (
        <Navbar />
      )}
      {children}
      {!home && <Footer />}
    </div>
  );
}

export default Layout;
