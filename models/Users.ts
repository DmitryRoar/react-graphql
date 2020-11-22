const {model} = require('mongoose')

export const Users = model('Users', {name: String, age: String})