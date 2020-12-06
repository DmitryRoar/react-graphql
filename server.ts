const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const {resolve} = require('path')
const {graphqlHTTP} = require('express-graphql')
const passport = require('passport')
const config = require('config')

const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

const PORT = config.get('port')

app
  .use(cors({
    original: 'http://localhost:3000'
  }))
  .use(express.json({extended: true}))
  .use(passport.initialize())
  .use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
  }))
  
require('./middleware/passport')(passport)

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
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