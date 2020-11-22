const chalk = require('chalk')
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const express = require('express')
const app = express()
// const keys = require('./config/keys') // CONFIG!
const mongoose = require('mongoose')

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


const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://roar:idinaxuy@cluster0.odko0.mongodb.net/users', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
  } catch (e) {
    console.log('[MONGODB]: ', e)
  }
}
start()