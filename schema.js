const { gql } = require("apollo-server-express");
exports.typeDefs = gql`
  type Song {
    id: ID!
    name: String!
    url: String!
    category: String!
    description: String!
    createdDate: String
    likes: Int
    username: String
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    joinDate: String!
    favorites: [Song!]!
    verified: Boolean!
    comments: [Comment]!
  }

  type Token {
    token: String!
  }

  type Query {
    getAllSongs(id: String, word: String): [Song!]!
    Me: User
    getUserPosts: [Song!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    addSong(data: addSongInput): Song!
    deleteSong(id: String!): Song!
    updateSong(id: String!, data: updateSongInput): Song!
    likeSong(id: String!, userid: String!): Song!
    unlikeSong(id: String!, userid: String!): Song!
    signUpUser(data: SignUpUserInput): AuthPayload!
    signInUser(data: SignInUserInput): AuthPayload!
    createComment(songId: String!, body: String!): Song!
    deleteComment(songId: String!, commentId: String!): Song!
  }

  input updateSongInput {
    name: String!
    url: String!
    description: String!
    category: String!
  }

  input SignInUserInput {
    email: String!
    password: String!
  }

  input SignUpUserInput {
    username: String!
    password: String!
    email: String!
  }

  input addSongInput {
    name: String!
    description: String!
    category: String!
    url: String!
    username: String
  }
`;
