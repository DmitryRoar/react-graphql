import jwt from 'jsonwebtoken'
import config from 'config'

import { NextFunction } from 'express'

module.exports = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')
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
    req.userId = decodedToken.userId
    next()

  } catch (err) {
    req.isAuth = false
    return next()
  }
}