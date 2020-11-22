const chalk = require('chalk')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const express = require('express')
const app = express()

const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

const PORT = process.env.PORT || 3001

app
  .use(cors())
  .use(express.json())
  .use('/graphql', graphqlHTTP({
    schema, 
    rootValue: resolver,
    graphiql: true
  }))


const start = () => {
  app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
} 
start()