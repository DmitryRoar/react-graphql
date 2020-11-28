const {model} = require('mongoose')

export const AppUser = model('AppUser', {name: String, age: String})