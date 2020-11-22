const {buildSchema} = require('graphql')

module.exports = buildSchema(`
  type Users {
    name: String!
    age: String!
    id: String
  }

  type Query {
    getUsers: [Users]
  }
`)