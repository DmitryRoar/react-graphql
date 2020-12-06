const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type AppUsers {
    name: String!
    age: String!
  }
  
  type User {
    email: String!
    password: String!
    userToken: String
  }

  type Query {
    getUsers: [AppUsers!]
  }
  type Mutation {
    addUser(name: String!, age: String!): AppUsers!
    register(email: String! password: String!): User!
    login(email: String! password: String!): User!
  }
`)