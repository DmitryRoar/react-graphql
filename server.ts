const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const {resolve} = require('path')
const {graphqlHTTP} = require('express-graphql')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const config = require('config')
// const isAuth = require('./middleware/isAuth') 
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

const PORT = config.get('port')

const store = new MongoStore({
  uri: config.get('mongoURI'),
  collection: 'sessions'
})

app
  .use(cors({
    original: 'http://localhost:3000'
  }))
  .use(express.json({extended: true}))
  .use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000},
    store
  }))
  .use(cookieParser())
  .use('/graphql', graphqlHTTP((req: any, res: any) => ({
    schema,
    rootValue: resolver,
    graphiql: true,
    context: {
      setSession(nameSession: string, value: string | object) {
        req[nameSession] = value
        return req.session.save((err: any) => {
          if (err) return
        })
      },
      readSession(nameSession: string) {
        return req[nameSession]
      }
    }
  })))
  
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