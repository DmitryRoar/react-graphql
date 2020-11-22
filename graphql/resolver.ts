const users = [
  {name: 'dmitry', age: 30}
]

module.exports = {
  getUsers() {
    return users.map(user => ({
      ...user,
      id: Math.round(Math.random() * 30)
    }))
  }
}