import { gql } from "@apollo/client";

const GET_ALL_SONGS = gql`
  query getAllSongs($id: String, $word: String) {
    getAllSongs(id: $id, word: $word) {
      id
      name
      url
      category
      description
      createdDate
      username
      likes
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const ME_QUERY = gql`
  query {
    Me {
      id
      username
      email
      joinDate
      favorites {
        id
        name
        url
        category
        description
        createdDate
        username
        likes
      }
    }
  }
`;

const GET_USER_POSTS = gql`
  query {
    getUserPosts {
      id
      name
      url
      category
      description
      createdDate
      username
      likes
    }
  }
`;

export { GET_ALL_SONGS, ME_QUERY, GET_USER_POSTS };
