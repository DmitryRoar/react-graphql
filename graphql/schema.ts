const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type AppUsers {
    name: String!
    age: String!
    owner: ID
    _id: ID
  }
  
  type UserRegister {
    userId: ID
  }

  type UserLogin {
    userId: ID
    token: String
    tokenExpiration: Int!
  }

  type Query {
    test: String
  }

  type RemoveAppUser {
    removeUser: AppUsers
  }
  
  type Mutation {
    getUsers(owner: String!): [AppUsers!]
    addUser(name: String!, age: String!, owner: ID!): AppUsers!
    removeAppUser(owner: String!): AppUsers!
    
    register(email: String!, password: String!): UserRegister!
    login(email: String!, password: String!): UserLogin!
  }
`)