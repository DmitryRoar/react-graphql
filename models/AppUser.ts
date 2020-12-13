const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    ref: 'User'
  }
})

export const AppUser = model('AppUser', schema)