const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type AppUsers {
    name: String!
    age: String!
    owner: ID
  }
  
  type UserRegister {
    userId: ID
  }

  type UserLogin {
    userId: ID
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    getUsers: [AppUsers!]
  }
  
  type Mutation {
    addUser(name: String!, age: String!, owner: ID): AppUsers!
    register(email: String!, password: String!): UserRegister!
    login(email: String!, password: String!, req: ID): UserLogin!
  }
`)