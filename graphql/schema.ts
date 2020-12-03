const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type AppUsers {
    name: String!
    age: String!
  }

  type Test {
    userList: [AppUsers!]
  }
  
  type User {
    email: String!
    password: String!
    userToken: String
  }
  type Query {
    getUsers: [Test!]
  }
  type Mutation {
    addUser(name: String!, age: String!): Test!
    register(email: String! password: String!): User!
    login(email: String! password: String!): User!
  }
`)