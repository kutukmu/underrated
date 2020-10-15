import React from "react";
import UserLikes from "./UserLikes";
import UserPosts from "./UserPosts";
import withAuth from "./withAuth";
const Profile = (props) => {
  return (
    <div className="profile">
      <div className="container">
        <div className="profile-inner">
          <UserLikes />
          <UserPosts />
        </div>
      </div>
    </div>
  );
};

export default withAuth((session) => session && session.Me)(Profile);
