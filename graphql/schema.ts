const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type User {
    name: String!
    age: String!
    id: ID
  }

  type Query {
    getUsers: [User]!
  }

  type Mutation {
    addUser(name: String!, age: String!): User!
  }
`)