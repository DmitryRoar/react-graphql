const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const {resolve} = require('path')
const {graphqlHTTP} = require('express-graphql')
const config = require('config')
const isAuth = require('./middleware/isAuth') 

const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

const PORT = config.get('port')

app
  .use(isAuth)
  .use(cors({
    original: 'http://localhost:3000'
  }))
  .use(express.json({extended: true}))
  .use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
  }))
  
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