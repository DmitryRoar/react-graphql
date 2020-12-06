import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

import {AppUser} from '../models/AppUser'
import {User} from '../models/User'
import {IUsers} from '../src/interfaces'

module.exports = {
  async getUsers() {
    return await AppUser.find({}, (err: any, users: IUsers[]) => {
      if (err) {
        throw new Error(`[MONGO_GetUsers]: ${err}`)
      }
      return users
    })
  },
  async addUser({name, age}: any) {
    const user = new AppUser({name, age})
    await user.save()
    return user
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
      return user
    } catch (err) {
      throw new Error(`[MONGO_REGISTER]: ${err}`)
    }
  },
  async login({email, password}: any) {
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

      return `Bearer ${token}`
    } catch (err) {
      throw new Error(`[MONGO_LOGIN]: ${err}`)
    }
  }
}