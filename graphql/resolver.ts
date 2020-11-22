import {Users} from '../models/Users'
import {IUsers} from '../src/interfaces'

module.exports = {
  async getUsers() {
    const users = await Users.find({}, (err: any, u: IUsers[]) => {
      if (err) {
        console.log('[MOGOOSE_GetUsers]: ', err)
        return
      }
      return u
    })
    return users
  },
  async addUser({name, age}: any) {
    const user = new Users({name, age})
    await user.save()
    return user
  }
}