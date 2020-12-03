const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  // age: {
  //   type: String,
  //   required: true
  // },
  userList: [
    {
      name: {
        type: String,
        required: true
      },
      age: {
        type: String,
        required: true
      },
      userId: {
        type: Types.ObjectId,
        ref: 'AppUser'
      }
    }
  ]
})

export const AppUser = model('AppUser', schema)