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
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

export const User = model('User', schema)