import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

import {AppUser} from '../models/AppUser'
import {User} from '../models/User'
import {IAuthProps, IForUserIdFind, IUser} from '../interfaces'

module.exports = {
  test() {
    console.log('hello')
  },
  async getUsers({owner}: IForUserIdFind): Promise<IUser[]> {
    return await AppUser.find({owner}) 
  },
  async addUser({name, age, owner}: IUser & IForUserIdFind,): Promise<IUser> {
    try {
      const user = await new AppUser({name, age, owner})
      await user.save()
      return user
    } catch (err) {
      console.log(`[MONGO_AddUser], ${err}`)
      throw new Error(err)
    }
  },
  async register({email, password}: IAuthProps): Promise<{userId: string}> {
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
  async login({email, password}: IAuthProps): Promise<{userId: string, token: string, tokenExpiration: number}> {
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
  },
  async removeAppUser({owner}: IForUserIdFind) {
    try {
      const removeUser = await AppUser.findOneAndRemove({owner})
      return removeUser
    } catch (err) {
      throw new Error(`[MONGO_REMOVEAPPUSER]: ${err}`)
    }
  }
}