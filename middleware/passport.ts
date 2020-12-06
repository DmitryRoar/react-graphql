import {Strategy, ExtractJwt} from 'passport-jwt'
import config from 'config'

import {User} from '../models/User'

const options: any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwtSecret')
}

module.exports = (passport: any) => {
  passport.use(
    new Strategy(options, async (payload: any, done: any) => {
      try {
        const user = await User.findById(payload.userId)
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (err) {
        console.log(`[PASSPORT]: ${err}`)
      }
    })
  )
}
