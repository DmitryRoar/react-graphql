const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
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
    ref: 'User'
  }
})

export const AppUser = model('AppUser', schema)