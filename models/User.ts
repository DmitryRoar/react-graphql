const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createUser: {
    type: Types.ObjectId,
    ref: 'AppUser'
  }
})

export const User = model('User', schema)