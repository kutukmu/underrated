import { gql } from "@apollo/client";

const USER_SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    signUpUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      token
      user {
        username
        email
        id
      }
    }
  }
`;

const USER_SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInUser(data: { email: $email, password: $password }) {
      token
      user {
        username
        email
        id
        verified
      }
    }
  }
`;

const ADD_SONG = gql`
  mutation AddSong(
    $name: String!
    $url: String!
    $category: String!
    $description: String!
    $username: String!
  ) {
    addSong(
      data: {
        name: $name
        url: $url
        category: $category
        description: $description
        username: $username
      }
    ) {
      name
      url
      category
      description
      username
    }
  }
`;

const DELETE_SONG = gql`
  mutation DeleteSong($id: String!) {
    deleteSong(id: $id) {
      name
    }
  }
`;

const LIKE_SONG = gql`
  mutation LikeSong($id: String!, $userid: String!) {
    likeSong(id: $id, userid: $userid) {
      name
    }
  }
`;

const UNLIKE_SONG = gql`
  mutation unLikeSong($id: String!, $userid: String!) {
    unlikeSong(id: $id, userid: $userid) {
      name
    }
  }
`;

const UPDATE_SONG = gql`
  mutation UpdateSong($id: String!, $data: updateSongInput!) {
    updateSong(id: $id, data: $data) {
      name
      url
      category
      description
    }
  }
`;

const ADD_COMMENT = gql`
  mutation CreateComment($songId: String!, $body: String!) {
    createComment(songId: $songId, body: $body) {
      name
      comments {
        username
        body
      }
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($songId: String!, $commentId: String!) {
    deleteComment(songId: $songId, commentId: $commentId) {
      name
      description
      comments {
        id
      }
    }
  }
`;

export {
  USER_SIGN_UP,
  USER_SIGN_IN,
  ADD_SONG,
  DELETE_SONG,
  LIKE_SONG,
  UNLIKE_SONG,
  UPDATE_SONG,
  ADD_COMMENT,
  DELETE_COMMENT,
};
