import jwt from 'jsonwebtoken'
import config from 'config'

import { NextFunction } from 'express'

module.exports = (req: any, res: any, next: NextFunction) => {
  const authHeader = res.cookie('userId')
  console.log(authHeader)
  next()
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    req.isAuth = false
    return next()
  }
  try {
    const decodedToken: any = jwt.verify(token, config.get('jwtSecret'))

    if (!decodedToken) {
      req.isAuth = false
      return next()
    }
    req.isAuth = true
    console.log(decodedToken.userId)
    res.session.userId = decodedToken.userId
    next()

  } catch (err) {
    req.isAuth = false
    return next()
  }
}