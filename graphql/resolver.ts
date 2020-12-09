import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

import {AppUser} from '../models/AppUser'
import {User} from '../models/User'
import {IUsers} from '../src/interfaces'

module.exports = {
  async getUsers(req: any) {
    console.log('req.userId', req.userId)
    console.log('req.userId', req.isAuth)
    return await AppUser.find() as IUsers[]
  },
  async addUser({name, age}: any, req: any) {
    try {
      const user = new AppUser({name, age, owner: req.userId})
      await user.save()
      return user
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  },
  async register({email, password}: any) {
    try {
      const candidate = await User.findOne({email})
      if (candidate) {
        throw new Error('Email Exists')
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await new User({
        email, 
        password: hashedPassword
      })
      await user.save()
      return {userId: user._id}
    } catch (err) {
      throw new Error(`[MONGO_REGISTER]: ${err}`)
    }
  },
  async login({email, password}: any, req: any) {
    try {
      const user = await User.findOne({email})
      if (!user) {
        throw new Error('User not found')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new Error('Wrong password')
      }
      const token = jwt.sign(
        {userId: user._id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )
      return {userId: user._id, token, tokenExpiration: 1}
    } catch (err) {
      throw new Error(`[MONGO_LOGIN]: ${err}`)
    }
  }
}