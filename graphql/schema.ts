const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type Users {
    name: String!
    age: String!
    id: ID!
  }

  type User {
    email: String!
    password: String!
    userToken: String
    id: ID
  }

  type Query {
    getUsers: [Users]!
  }

  type Mutation {
    addUser(name: String!, age: String!): Users!
    register(email: String! password: String!): User!
    login(email: String! password: String!): User!
  }
`)